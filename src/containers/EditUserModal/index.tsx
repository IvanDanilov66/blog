import React, {FC, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Modal from 'components/Modal';
import {editUser} from 'dispatchers/users/user';
import {selectActiveUser} from 'selectors/state';
import {AppDispatch} from 'types/store';
import {displayToast} from 'utils/toast';
import yup from 'utils/yup';

import EditUserModalFields, {FormValues} from './EditUserModalFields';

import './EditUserModal.scss';

interface ComponentProps {
  close(): void;
}

const EditUserModal: FC<ComponentProps> = ({close}) => {
  const activeUser = useSelector(selectActiveUser);
  const dispatch = useDispatch<AppDispatch>();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const initialValues = {
    accountNumber: activeUser.account_number || '',
    displayName: activeUser.display_name || '',
    githubUsername: activeUser.github_username || '',
    profileImageUrl: activeUser.profile_image || '',
    slackName: activeUser.slack_username || '',
  };

  const handleSubmit = async ({
    accountNumber,
    displayName,
    githubUsername,
    profileImageUrl,
    slackName,
  }: FormValues): Promise<void> => {
    try {
      setSubmitting(true);
      await dispatch(
        editUser({
          account_number: accountNumber,
          display_name: displayName,
          github_username: githubUsername,
          pk: activeUser.pk,
          profile_image: profileImageUrl,
          slack_username: slackName,
        }),
      );
      close();
    } catch (error) {
      displayToast('There was an error with the request', 'warning');
      setSubmitting(false);
    }
  };

  const validationSchema = yup.object().shape({
    accountNumber: yup.string().length(64, 'Account Number must be 64 characters long'),
    displayName: yup.string().required('This field is required'),
    githubUsername: yup.string(),
    profileImageUrl: yup.string().url('Must be a valid URL'),
    slackName: yup.string(),
  });

  return (
    <Modal
      className="EditUserModal"
      close={close}
      header="Edit Profile"
      ignoreDirty
      initialValues={initialValues}
      onSubmit={handleSubmit}
      submitButton="Save"
      submitting={submitting}
      validationSchema={validationSchema}
    >
      <EditUserModalFields />
    </Modal>
  );
};

export default EditUserModal;
