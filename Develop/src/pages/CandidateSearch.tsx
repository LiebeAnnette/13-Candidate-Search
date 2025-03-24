import { useEffect, useState } from "react";
import { Candidate } from "../interfaces/Candidate.interface";
import { searchGithub, searchGithubUser } from "../api/API";

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [noMoreCandidates, setNoMoreCandidates] = useState(false);

  useEffect(() => {
    fetchNextCandidate();
  }, []);

  const fetchNextCandidate = async () => {
    setIsLoading(true);
    try {
      const candidates = await searchGithub();
      if (!candidates.length) {
        setNoMoreCandidates(true);
        return;
      }

      // Pick the first candidate and get detailed info
      const fullProfile = await searchGithubUser(candidates[0].login);
      setCurrentCandidate(fullProfile);
    } catch (error) {
      console.error("Failed to fetch candidate:", error);
      setNoMoreCandidates(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCandidate = () => {
    if (!currentCandidate) return;

    const saved = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    saved.push(currentCandidate);
    localStorage.setItem("savedCandidates", JSON.stringify(saved));

    fetchNextCandidate();
  };

  const handleSkipCandidate = () => {
    fetchNextCandidate();
  };

  if (isLoading) {
    return <p>Loading candidate...</p>;
  }

  if (noMoreCandidates) {
    return <p>No more candidates available!</p>;
  }

  return (
    <section>
      <h1>Candidate Search</h1>
      {currentCandidate && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <img
            src={currentCandidate.avatar_url}
            alt={currentCandidate.name}
            width="100"
          />
          <h2>{currentCandidate.name || "No Name Provided"}</h2>
          <p>
            <strong>Username:</strong> {currentCandidate.login}
          </p>
          <p>
            <strong>Location:</strong> {currentCandidate.location || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {currentCandidate.email || "N/A"}
          </p>
          <p>
            <strong>Company:</strong> {currentCandidate.company || "N/A"}
          </p>
          <p>
            <strong>Profile:</strong>{" "}
            <a
              href={currentCandidate.html_url}
              target="_blank"
              rel="noreferrer"
            >
              GitHub Profile
            </a>
          </p>
          <button onClick={handleSaveCandidate}>➕</button>
          <button onClick={handleSkipCandidate}>➖</button>
        </div>
      )}
    </section>
  );
};

export default CandidateSearch;
