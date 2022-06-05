export function calculateDescription(effect) {
    let description = effect.description;
    let evalMatch = description.match(/\[(.*?)\]/g);
    console.log(evalMatch);
    evalMatch.forEach(e => {
      let evalString = e;
      console.log(evalString);
      evalString = evalString.replace("tier", "effect.tier");
      evalString = evalString.replace("notes", "effect.notes");
      evalString = evalString.replace("[", "");
      evalString = evalString.replace("]", "");
      console.log(evalString);
      let evalResult = eval(evalString);

      description = description.replace(e, evalResult);
    });

    return description;
  }
