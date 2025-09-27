import { Header } from '../components/Header';
import './PageNotFound.css';

export function PageNotFound({cart}) {
  return (
    <>
      <title>Page Not Found</title>
      <Header cart={cart}/>
        <div className="page-not-found">
            <div className="error-code">404</div>
            <div className="error-message">Page Not Found</div>
            <div className="error-description">Sorry, the page you are looking for does not exist.</div>
        </div>
    </>
  );
}