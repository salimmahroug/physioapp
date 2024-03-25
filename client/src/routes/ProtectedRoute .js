import { Navigate } from 'react-router-dom';

// Composant de route protégée
function ProtectedRoute({ user, children }) {
    if (!user) {
        return <Navigate to="/Login" />
    }
    return children;
}

export default ProtectedRoute;
