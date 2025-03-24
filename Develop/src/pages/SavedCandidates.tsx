import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  return (
    <section>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No saved candidates yet.</p>
      ) : (
        savedCandidates.map((candidate) => (
          <div key={candidate.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', margin: '1rem 0' }}>
            <img src={candidate.avatar_url} alt={candidate.name} width="100" />
            <h2>{candidate.name || 'No Name Provided'}</h2>
            <p><strong>Username:</strong> {candidate.login}</p>
            <p><strong>Location:</strong> {candidate.location || 'N/A'}</p>
            <p><strong>Email:</strong> {candidate.email || 'N/A'}</p>
            <p><strong>Company:</strong> {candidate.company || 'N/A'}</p>
            <p><strong>Profile:</strong> <a href={candidate.html_url} target="_blank" rel="noreferrer">GitHub Profile</a></p>
          </div>
        ))
      )}
    </section>
  );
};

export default SavedCandidates;
