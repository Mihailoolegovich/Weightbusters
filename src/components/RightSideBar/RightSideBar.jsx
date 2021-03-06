import { v4 as uuidv4 } from 'uuid';

import s from './RightSideBar.module.scss';
import { useSelector } from 'react-redux';
import { ProductsSelectors } from 'redux/products';
import {
  getCalories,
  getNotRecommendProd,
} from 'redux/dailyCalorieIntakes/dailyCalorieIntake-selectors';

const RightSideBar = ({ date }) => {
  const getNotRecommendProdData = useSelector(getNotRecommendProd);
  const notRecommendProd = getNotRecommendProdData?.map(
    product => product.en[0]
  );

  const currentDateNow = date
    ? date.toLocaleDateString('en-GB')
    : new Date().toLocaleDateString('en-GB');

  const productsData = useSelector(ProductsSelectors.consumedProducts);

  const consumed = productsData
    ?.map(product => product.calories)
    .reduce((partialSum, a) => partialSum + a, 0);

  const dailyRate = useSelector(getCalories);

  const leftCalc = dailyRate - consumed;
  const left =
    leftCalc < 0
      ? 'Exceeded by ' + Math.abs(leftCalc.toFixed())
      : leftCalc.toFixed();

  const caloriesPercentage = () => {
    if (consumed !== 0) {
      const result = (100 * consumed) / dailyRate;
      return `${result.toFixed()}%`;
    }
    return 0;
  };

  const elements = [
    {
      id: uuidv4(),
      type: 'Left',
      data: left,
    },
    {
      id: uuidv4(),
      type: 'Consumed',
      data: consumed.toFixed(),
    },
    {
      id: uuidv4(),
      type: 'Daily rate',
      data: dailyRate || 0,
    },
    {
      id: uuidv4(),
      type: 'n% of normal',
      data: caloriesPercentage(),
    },
  ];

  function capitalizeFirstLetter(data) {
    return data[0].toUpperCase() + data.slice(1);
  }

  const diet =
    getNotRecommendProdData.length !== 0
      ? capitalizeFirstLetter(notRecommendProd.join(', '))
      : 'Your diet weel be dispalayed here';

  return (
    <div className={s.container}>
      <div className={s.summaryForDate}>
        <p className={s.title}>Summary for {currentDateNow}</p>
        <ul className={s.list}>
          {elements.map(({ type, data, id }) => (
            <li className={s.item} key={id}>
              <p className={s.text}>{type}</p>
              <p className={s.text}>{data} kcal</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={s.foodNotRecommend}>
        <p className={s.title}>Food not recommend</p>
        <p className={s.text}>{diet}</p>
      </div>
    </div>
  );
};

export default RightSideBar;
