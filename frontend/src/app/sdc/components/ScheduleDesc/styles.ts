import styled from "styled-components";

export const ScheduleTitle = styled.div`
  width: 100%;
  font-size: ${({ theme }) => theme.textSizes["text-title-xl"]};
  color: #0072ed;
  margin: 1rem 0;
`;

export const ScheduleDescContainer = styled.div`
  div {
    text-align: center;
  }

  > div:nth-child(1) {
    margin-bottom: 0;
  }
`;

export const ScheduleSubtitle = styled.div`
  font-weight: 400;
  opacity: 80%;
`;
