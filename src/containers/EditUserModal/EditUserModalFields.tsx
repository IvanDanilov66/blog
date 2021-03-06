import React, {FC} from 'react';
import {FormInput, FormTextArea} from 'components/FormComponents';

export const initialValues = {
  accountNumber: '',
  displayName: '',
  githubUsername: '',
  profileImageUrl: '',
  slackName: '',
};

export type FormValues = typeof initialValues;

const EditUserModalFields: FC = () => {
  return (
    <>
      <FormInput label="Display Name" name="displayName" focused required />
      <FormInput label="Github Username" name="githubUsername" />
      <FormInput label="Slack Name" name="slackName" />
      <FormTextArea label="Account Number" name="accountNumber" />
      <FormTextArea label="Profile Image URL" name="profileImageUrl" />
    </>
  );
};

export default EditUserModalFields;
