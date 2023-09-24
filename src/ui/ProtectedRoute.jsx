import { styled } from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the autheticated user
  const { isLoading, isAuthenticated } = useUser();

  // 3. if no authenticated user => /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [navigate, isAuthenticated, isLoading]);

  // 2.While loading show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. if there is a user => render app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
