import React from "react";
import CSSlider from "./slider";
import styles from "./index.less";

interface Contact {
  name: string;
  phone: string;
  email: string;
}
type OmitEmailContact = Omit<Contact, 'email'>;
type ContactPick = Pick<Contact, 'name' | 'email'>
const App = () => {
  const testData: OmitEmailContact = {name: 'cc', phone: '123'};
  return (
    <>
      <div>
        <CSSlider />
      </div>
    </>
  );
};

export default App;
