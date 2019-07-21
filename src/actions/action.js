// export const changeAddress = (address) => dispatch => {
//   dispatch({
//     type: 'change-address',
//     payload: 'result_of_simple_action',
//   });
// };

export const changeAddress = (address) => ({
    type: 'change-address',
    payload: address,
});
