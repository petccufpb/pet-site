import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: white;
`;

export const AreaSelector = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #333;
  padding-bottom: 1rem;
`;

export const AreaOption = styled.button<{ selected?: boolean }>`
  background: none;
  border: none;
  color: ${({ selected, theme }) => (selected ? theme.colors?.["base-green"] || "#04d361" : "#a9a9b2")};
  font-size: 1.1rem;
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
  cursor: pointer;
  transition: color 0.2s;
  padding: 0.5rem 0;

  &:hover {
    color: white;
  }
`;

export const AreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const SubTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

export const Description = styled.p`
  color: #a9a9b2;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
`;

export const Area = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  background: #121214;
  padding: 1.5rem;
  border-radius: 0.5rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h3 {
    font-size: 0.9rem;
    color: #a9a9b2;
    margin: 0;
  }

  input {
    padding: 0.8rem;
    border-radius: 0.5rem;
    border: none;
    background: #202024;
    color: white;
    font-family: inherit;
    outline: none;

    &:focus {
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors?.["fifth-blue"] || "#38bcde"};
    }
  }
`;

export const SelectNative = styled.select`
  padding: 0.8rem;
  border-radius: 0.5rem;
  border: none;
  background: #202024;
  color: white;
  font-family: inherit;
  outline: none;
  cursor: pointer;

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors?.["fifth-blue"] || "#38bcde"};
  }
`;

export const Button = styled.button`
  border: none;
  font-family: inherit;
  color: white;
  border-radius: 0.5rem;
  outline: ${({ theme }) => theme.colors?.["fifth-blue"] || "#38bcde"} solid 1px;
  background-color: ${({ theme }) => theme.colors?.["fifth-blue"] ? `${theme.colors["fifth-blue"]}75` : "#38bcde75"};
  padding: 0.8rem 1.5rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: small;
  transition: all 300ms ease-in-out;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: grayscale(100%);
  }
`;

export const SendButton = styled(Button)`
  gap: 0.5rem;
  font-size: medium;
  max-width: 15rem;
  background-color: ${({ theme }) => theme.colors?.["base-green"] ? `${theme.colors["base-green"]}75` : "#04d36175"};
  outline-color: ${({ theme }) => theme.colors?.["base-green"] || "#04d361"};

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme.colors?.["base-green"] ? `${theme.colors["base-green"]}60` : "#04d36160"};
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  background: #121214;
  border-radius: 0.5rem;
  padding: 1rem;

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;

    th, td {
      padding: 1rem;
      border-bottom: 1px solid #202024;
    }

    th {
      color: #a9a9b2;
      font-weight: bold;
    }
  }
`;

export const ProgressModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ProgressModalContent = styled.div`
  background: #202024;
  padding: 2.5rem;
  border-radius: 0.5rem;
  text-align: center;
  width: 90%;
  max-width: 450px;

  h2 { margin-bottom: 1rem; }
  p { color: #a9a9b2; margin-bottom: 2rem; }
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 12px;
  background: #121214;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

export const ProgressBarFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background: ${({ theme }) => theme.colors?.["base-green"] || "#04d361"};
  transition: width 0.3s ease;
`;