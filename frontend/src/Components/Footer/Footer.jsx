import styled from "styled-components"

export default function Footer()
{
    return(
        <FooterStyled className="footer">
            <p><a href="https://www.linkedin.com/in/aman821" target="/">@Aman</a> all rights reserves.</p>
        </FooterStyled>
    )
}

const FooterStyled = styled.div`
position: fixed;
bottom: 0;
left: 0;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
height: 8%;
background-color: gray;
    p,a{
        text-decoration: none;
        color: white;
        font-size: 1.1rem;
        text-align: center;
    }
`;