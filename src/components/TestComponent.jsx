// ─── Test Component ───────────────────────────────────────────────────────
export default function TestComponent() {
  return (
    <div style={{
      backgroundColor: 'red',
      color: 'white',
      padding: '20px',
      fontSize: '24px',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 9999
    }}>
      TEST COMPONENT - If you can see this, React is working!
    </div>
  );
}
