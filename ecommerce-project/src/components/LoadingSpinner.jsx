import './LoadingSpinner.css';

export function LoadingSpinner() {
  return (
    <div className="loading-spinner-container" data-testid="loading-spinner">
      <div className="loading-spinner"></div>
    </div>
  );
}
