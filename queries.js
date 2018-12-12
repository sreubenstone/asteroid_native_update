import { gql } from "apollo-boost";

export const SEND = gql`
  mutation sendSMS($number: String!, $body: String!) {
    sendSMS(number: $number, body: $body) {
      id
    }
  }
`;
