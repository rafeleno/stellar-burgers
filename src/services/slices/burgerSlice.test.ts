//TODO: разобраться и доделать все это

// import { TIngredient } from '@utils-types';
// import { burgerSlice } from './burgerSlice';

// const reducer = burgerSlice.reducer;
// const addIngredient = burgerSlice.actions.addIngredient;

// describe('burgerSlice — addIngredient', () => {
//   const baseState = {
//     constructorItems: {
//       bun: null,
//       ingredients: []
//     }
//   };

//   const testIngredient: TIngredient = {
//     _id: '123',
//     name: 'Булка вкусная',
//     type: 'bun',
//     proteins: 10,
//     fat: 10,
//     carbohydrates: 10,
//     calories: 100,
//     price: 100,
//     image: 'image.png',
//     image_large: 'image_large.png',
//     image_mobile: 'image_mobile.png'
//   };

//   it('добавляет булку в state.constructorItems.bun', () => {
//     const action = addIngredient(testIngredient);
//     const nextState = reducer(baseState, action);

//     expect(nextState.constructorItems.bun).toMatchObject(testIngredient);
//     expect(typeof nextState.constructorItems.bun?.id).toBe('string');
//   });

//   it('добавляет не-булку в список ингредиентов', () => {
//     const sauceIngredient = { ...testIngredient, type: 'sauce' as const };
//     const action = addIngredient(sauceIngredient);
//     const nextState = reducer(baseState, action);

//     expect(nextState.constructorItems.ingredients).toHaveLength(1);
//     expect(nextState.constructorItems.ingredients[0]).toMatchObject(
//       sauceIngredient
//     );
//     expect(typeof nextState.constructorItems.ingredients[0].id).toBe('string');
//   });
// });
