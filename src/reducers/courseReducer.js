export default function courseReducer(state = [], action){
    switch (action.type) {
        case 'CREATE_COURSE':
            // remeber state is immutable, so dont mutate state
            // state.push(action.course)
            // return state

            // copy original array with spread operator 
            // and create a new array with an extra value
            return [...state, 
                Object.assign({}, action.course) //create a deep copy
            ]
    
        default:
            // since we can have multiple reducers handling different actions
            // if this reducer doesn't handel a action we have to return current state
            // so next reducer has the correct state
            return state;
    }

}