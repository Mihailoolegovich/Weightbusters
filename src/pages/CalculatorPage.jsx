import { useDispatch, useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';
import PropTypes from 'prop-types';

import {
  dailyCaloriesPrivate,
  dailyCaloriesPublic,
} from 'redux/dailyCalorieIntakes/dailyCalorieIntake-operations';
import DailyCaloriesForm from '../components/DailyCaloriesForm/DailyForm';
import Modal from '../components/Modal/Modal';
import DailyCaloriesIntake from 'components/DailyCaloriesIntake/DailyCaloriesIntake';
import { getUserData } from 'redux/dailyCalorieIntakes/dailyCalorieIntake-selectors';

const CalculatorPage = ({ onToggleModal, showModal }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(authSelectors.getLoggedOn);

  const userData = useSelector(getUserData);

  const onSubmit = values => {
    isLoggedIn
      ? dispatch(dailyCaloriesPrivate(values))
      : dispatch(dailyCaloriesPublic(values));
    onToggleModal();
  };

  const userValues = {
    height: `${userData.height}`,
    age: `${userData.age}`,
    currentWeight: `${userData.currentWeight}`,
    desiredWeight: `${userData.desiredWeight}`,
    bloodType: `${userData.bloodType}`,
  };

  return (
    <>
      <DailyCaloriesForm onSubmit={onSubmit} initialValues={userValues} />

      {showModal && (
        <Modal onClick={onToggleModal} onClose={onToggleModal}>
          <DailyCaloriesIntake closeModal={onToggleModal} />
        </Modal>
      )}
    </>
  );
};

export default CalculatorPage;

CalculatorPage.propTypes = {
  onToggleModal: PropTypes.func,
};
