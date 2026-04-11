// ─── Student Info Component ───────────────────────────────────────────────────────
import { useStudentUser } from '../contexts/StudentUserContext';

export default function StudentInfo() {
  const { fullName, profile } = useStudentUser();
  
  return (
    <div className="text-sm text-text-dim">
      <p>👤 Student: {fullName}</p>
      {profile && (
        <p>🎓 ID: {profile.id} | {profile.course} - {profile.year}</p>
      )}
    </div>
  );
}
