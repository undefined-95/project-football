const initialState = {
  loadTeam: [],
};

export function team(state = initialState, action) {
  switch (action.type) {
    case "load/team/fulfilled":
      return {
        ...state,
        loadTeam: action.payload,
      };

    case "add/team/fulfilled":
      return {
        ...state,
        loadTeam: [
          ...state.loadTeam,
          action.payload
        ],
      };
    default:
      return state;
  }
}

export const loadingTeams = () => {
  return async (dispatch) => {
    await fetch("/team")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "load/team/fulfilled", payload: data });
      });
  };
};

export const addTeam = (
  text,
  image
) => {
  return async (dispatch) => {
    dispatch({ type: "add/team/pending" });

    const response = await fetch(`/team`, {
      method: "POST",

      body: JSON.stringify({
        name: text,
        image: image
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await response.json();

    dispatch({
      type: "add/team/fulfilled",
      payload: json,
    });
  };
};
