
import { get } from 'svelte/store';
import * as meta from "../stores/selectedMeta.js";
import * as modifiers from "../stores/selectedModifiers.js";
import * as effects from "../stores/selectedEffects.js";


  function calcSpellResist() {
    return calcSpellCost() + 5;
  }
  
  function calcSpellCost() {
    const {  SPCost } = meta;
    const SP = get(SPCost);
    let cost = Math.ceil(SP/10.0) + 1;

    const { selectedModifiers } = modifiers;
    const modList = get(selectedModifiers)
    if (modList.filter(mod => mod.name === "Exhausting").length > 0) {
      cost +=1;
    }
    if (modList.filter(mod => mod.name === "Uncomplicated").length > 0) {
      cost -=1;
    }


    return cost;
  }

  function calcComponentCost(tier) {
    let cost = 1;
    if(tier < 5)
        cost = tier *25;
    else if(tier < 9)
        cost = 100 + (tier-4) * 100;
    else
        cost = 500 + (tier-8) * 2000;
    return cost;
  }

function elementAmount(tier,domain){
    switch (domain) {
        case "Fire":
            switch(tier){
                case 1:
                    return "A spark of flames (300 Celcius)"
                case 2:
                    return "a roaring fire (750 Celcius)"
                default:
                case 3:
                    return "a blazing inferno (1200 Celcius), automatically applying On Fire Condition"
            }
        case "Water":
            switch(tier){
                case 1:
                    return "a drop of water"
                case 2:
                    return "a liter of water"
                default:
                case 3:
                    return "20 liters of water"
            }
        case "Earth":
            switch(tier){
                case 1:
                    return "a handful of dirt"
                case 2:
                    return "1kg of top soil or rock"
                default:
                case 3:
                    return "20kg of top soil or rock"
            }
        case "Air":
            switch(tier){
                case 1:
                    return "a gasp of air"
                case 2:
                    return "a cubic meter of Air"
                default:
                case 3:
                    return "10 cubic meters of Air"
            }
        default:
            return "Element";
    }
}

function movementConditionDesc(tier){
    switch(tier){
        case 1:
          return "unable to Run";
        case 2:
          return "only able to use 1 Move action a turn";
        case 3:
        default:
            return "unable to move at all";
      }
}
function thoughts(tier){
    switch(tier){
        case 1:
          return "surface thoughts";
        case 2:
          return "deeper thoughts";
        case 3:
            return "memories"
        default:
            return "subconscious";
      }
}

function comms(tier){
    switch(tier){
        case 1:
          return "words";
        case 2:
          return "music, sounds, words or images";
        case 3:
            return "dreams"
        default:
            return "subconscious";
      }
}

function temporaryBodySideEffect(domain){
    switch (domain) {
        case "Holy":
            return "starts glowing with holy protection";
        case "Earth":
            return "hardens with rocks, reducing their move by 1m, run by 2m and sprint by 4m";
        case "Nature":
            return " grows thicker skin and starts resembling a beast with natural toughness";
        case "Necromancy":
            return "grows painful bony protrusions and leathery fur, harming their mind by 1d10 points once upon spell cast, the points come back";
        default:
            return "applies damaging condition";
    }
}

function damagingCondition(domain){
    switch (domain) {
        case "Fire":
            return "catches on Fire, Burning";
        case "Water":
            return "becomes Poisoned, losing";
        case "Air":
            return "starts Suffocating, losing";
        case "Necromancy":
            return "starts Bleeding, losing";
        default:
            return "applies damaging condition";
    }
}

function thwartStat(domain){
    switch (domain) {
        case "Fire":
            return "Dexterity";
        case "Water":
            return "Strength";
        case "Earth":
            return "Strength"
        case "Air":
            return "Dexterity";
        case "Necromancy":
            return "Empathy";
        case "Holy":
            return "Empathy";
        case "Mind":
            return "Intelligence";
        case "Illusion":
            return "Intelligence";
        default:
            return "Statistic";
    }
}

const rangeMeters = (tier) => {
    let meters = 0
  
    for (let i = 0; i < tier; i++) {
      if (i < 5) {
        meters += 10
      } else if (i < 10) {
        meters += 100
      } else {
        meters += 1000
      }
    }
  
    return meters;
  }
  
 const aoeArea = (tier) => {
    let area = 0;
  
    for (let i = 0; i < tier; i++) {
      if (i < 10) {
        area += 10
      } else if (i < 20) {
        area += 100
      } else if (i < 30) {
        area += 1000
      } else {
        area += 10000
      }
    }

    // double area if aura is selected
    const { selectedModifiers } = modifiers;
    const modList = get(selectedModifiers)
    if (modList.filter(mod => mod.name === "Aura").length > 0) {
      area *= 2;
    }

    return area;
  }

function radiusCalc(tier){
    let area = aoeArea(tier);
    let radius = Math.sqrt(area / Math.PI);
    
    return Math.ceil(radius);
}

function rectWidthCalc(tier,notes){
    let area = aoeArea(tier);
  try {
    let width = area/parseInt(notes);
    return Math.ceil(width);
  } catch (error) {
    return "Enter a Number into notes";
  }
}

function coneHeightCalc(tier,notes){
    let area = aoeArea(tier);
    try {
        let height = 2 * area / parseInt(notes);
        return Math.ceil(height);
    } catch (error) {
    return "Enter a Number into notes";
  }
}

export function calculateDescription(effect) {

  const { name, description, selectedDomain, selectedMode } = meta;

  const spell = {
    name: get(name),
    description: get(description),
    domain: get(selectedDomain),
    mode: get(selectedMode),
  };

  let formattedDescription = effect.description;
  let evalMatch = formattedDescription.match(/\[(.*?)\]/g);

  if (evalMatch) {
    evalMatch.forEach(e => {
      let evalString = e;
      evalString = evalString.replace("tier", "effect.tier");
      evalString = evalString.replace("notes", "effect.notes");
      evalString = evalString.replace("domain", "spell.domain");
      evalString = evalString.replace("cost", "calcSpellCost()");
      evalString = evalString.replace("resist", "calcSpellResist()");
      evalString = evalString.replace("[", "");
      evalString = evalString.replace("]", "");
      let evalResult = eval(evalString);

      formattedDescription = formattedDescription.replace(e, evalResult);
    });
  }

  let funcMatch = formattedDescription.match(/\{(.*?)\}/g);

  if (funcMatch) {
    funcMatch.forEach(e => {
      let evalString = e;
      evalString = evalString.replace("{", "");
      evalString = evalString.replace("}", "");
      evalString = evalString.replace(spell.domain, "'" + spell.domain + "'")
      let evalResult = ""
      
      try { 
       evalResult = eval(evalString);
      } catch (error) {
        evalResult = `Error ${error}`;
      }

      formattedDescription = formattedDescription.replace(e, evalResult);
    });
  }


  return formattedDescription;
}