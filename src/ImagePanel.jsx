import { useEffect, useState } from 'react';
import { useAuth } from '../authorization';

// A panel where the user picks an image from their own computer, or reuses one they uploaded
// before. The image itself is stored in the database (see backend/routes/images.js), and the
// panel only remembers its id, so the whole site saves with the rest of the saved layout.
// It's a NEW file, so it doesn't change anyone else's code.

const MAX_BYTES = 2 * 1024 * 1024; // keep in sync with the server
const TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];

export default function ImagePanel({ data, onChange }) {
  const { token } = useAuth() ?? {};
  const [localData, setLocalData] = useState({});
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  // The settings are saved with the layout when the workspace passes onChange.
  // Without it they only live in memory (and are lost on reload).
  const settings = { imageId: null, alt: '', fit: 'contain', ...(onChange ? data : localData) };
  const update = (patch) => {
    const next = { ...settings, ...patch };
    if (onChange) onChange(next);
    else setLocalData(next);
  };

  // load the images this user already uploaded
  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    fetch('/api/images/mine', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Could not load your images'))))
      .then((list) => { if (!cancelled) setImages(list); })
      .catch((err) => { if (!cancelled) setMessage(err.message); });
    return () => { cancelled = true; };
  }, [token]);

  async function upload(e) {
    const file = e.target.files[0];
    e.target.value = ''; // so choosing the same file again still works
    if (!file) return;
    if (!TYPES.includes(file.type)) return setMessage('Please choose a PNG, JPG, GIF or WebP image.');
    if (file.size > MAX_BYTES) return setMessage('That image is over 2 MB. Please choose a smaller one.');

    setBusy(true);
    setMessage('');
    try {
      const res = await fetch('/api/images', {
        method: 'POST',
        headers: {
          'Content-Type': file.type,
          Authorization: `Bearer ${token}`,
          'X-Filename': encodeURIComponent(file.name),
        },
        body: file,
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || 'Upload failed');
      setImages((prev) => [body, ...prev]);
      update({ imageId: body.image_id });
    } catch (err) {
      setMessage(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(image) {
    if (!window.confirm('Delete this image? Any panel using it will show a broken image.')) return;
    const res = await fetch(`/api/images/${image.image_id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return setMessage('Could not delete that image');
    setImages((prev) => prev.filter((i) => i.image_id !== image.image_id));
    if (settings.imageId === image.image_id) update({ imageId: null });
  }

  if (!token) return <p style={{ padding: 8 }}>Log in to add your own images.</p>;

  return (
    <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 8, height: '100%', boxSizing: 'border-box' }}>
      {settings.imageId && (
        <img
          src={`/api/images/${settings.imageId}`}
          alt={settings.alt}
          style={{ width: '100%', flex: 1, minHeight: 80, objectFit: settings.fit }}
        />
      )}

      <label>
        Upload from your computer{' '}
        <input type="file" accept={TYPES.join(',')} onChange={upload} disabled={busy} />
      </label>
      {busy && <span>Uploading...</span>}
      {message && <span role="alert">{message}</span>}

      {images.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {images.map((img) => (
            <span key={img.image_id} style={{ position: 'relative' }}>
              <img
                src={`/api/images/${img.image_id}`}
                alt={img.filename}
                title={img.filename}
                onClick={() => update({ imageId: img.image_id })}
                style={{
                  width: 56, height: 56, objectFit: 'cover', cursor: 'pointer',
                  outline: img.image_id === settings.imageId ? '2px solid #2563eb' : 'none',
                }}
              />
              <button
                type="button"
                aria-label={`Delete ${img.filename}`}
                onClick={() => remove(img)}
                style={{ position: 'absolute', top: -6, right: -6, padding: '0 4px', lineHeight: 1.2 }}
              >
                x
              </button>
            </span>
          ))}
        </div>
      )}

      {settings.imageId && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
          <label>Description <input value={settings.alt} onChange={(e) => update({ alt: e.target.value })} /></label>
          <label>
            Fit{' '}
            <select value={settings.fit} onChange={(e) => update({ fit: e.target.value })}>
              <option value="contain">Show whole image</option>
              <option value="cover">Fill the space</option>
            </select>
          </label>
        </div>
      )}
    </div>
  );
}
