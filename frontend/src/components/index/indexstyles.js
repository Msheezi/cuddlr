import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  max-width: 250px;
  height: 450px;
  
  word-wrap: break-word;
  background-color: transparent;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);

  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  overflow: hidden;
  margin: 10px;
  &:hover {
    box-shadow: 0 0.125rem 0.25rem #a3fff6;
    transition-duration: 0.4s;
    transform: scale(1.03);
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 1px;
  /* padding: 1.25rem; */
  padding: 5px;
  position: relative;
  /* text-overflow: ellipsis;
  white-space: nowrap; */
  overflow: hidden;
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-style: italic;
  font-weight: bold;
  margin: 5 0;
  text-align: center;
  color: 	#333333;

  /* color: #3899E5; */
`;

export const Text = styled.p`
  /* line-height: 25px; */
  color: #6c757d;
`;

export const Image = styled.img`
  height: 250px;
  width: 250px;
  object-fit: cover;

  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
`;

export const Button = styled.button`
  cursor: pointer;
  margin-top: auto;
  width: 100%;
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
  display: block;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  z-index: 1;
  opacity: 1;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:hover {
    color: #fff;
    background-color: #218838;
    border-color: #1e7e34;
  }
`;
