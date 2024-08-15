import styled from "styled-components";

export const MainLayout = styled.div`
    padding: 2rem;
    height: 100%;
    display: flex;
    gap: 2rem;
    @media (max-width: 767px) {
        flex-direction: column;
        .sidebar{
            height: 50%;
        }
    }
`;

export const InnerLayout = styled.div`
    padding: 2rem 1.5rem;
    width: 100%;
`;