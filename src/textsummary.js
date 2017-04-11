/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global format:false */
/**
 * Provides a Text Summary for profiles.
 */

import cData from './json/traits.js';
import fData from './json/facets.js';
import vData from './json/values.js';
import nData from './json/needs.js';

const textSummary = (function () {

  var self = {
      jsonPath : 'json'
  };

  // Download all static data.
  self.circumplexData = {};
  self.facetsData = {};
  self.valuesData = {};
  self.needsData = {};

  /**
   * Load summary data and translations.
   */
  self.loadSummaryData = function () {
    self.circumplexData = cData;
    self.facetsData = fData;
    self.valuesData = vData;
    self.needsData = nData;
  };

  function compareByRelevance(o1, o2) {
    if (Math.abs(0.5 - o1.percentage) > Math.abs(0.5 - o2.percentage)) {
      return -1; // A trait with 1% is more interesting than one with 60%.
    } else if (Math.abs(0.5 - o1.percentage) < Math.abs(0.5 - o2.percentage)) {
      return 1;
    } else {
      return 0;
    }
  }

  function compareByValue(o1, o2) {
    if (Math.abs(o1.percentage) > Math.abs(o2.percentage)) {
      return -1; // 100 % has precedence over 99%
    } else if (Math.abs(o1.percentage) < Math.abs(o2.percentage)) {
      return 1;
    } else {
      return 0;
    }
  }

  function assembleTraits(personalityTree) {
    var sentences = [];
    var big5elements = [];

    // Sort the Big 5 based on how extreme the number is.
    personalityTree.children[0].children.forEach(function(p) {
      big5elements.push({
        id: p.id,
        percentage: p.percentage
      });
    });
    big5elements.sort(compareByRelevance);

    // Remove everything between 32% and 68%, as it's inside the common people.
    var relevantBig5 = big5elements.filter(function(item) {
      return Math.abs(0.5 - item.percentage) > 0.18;
    });
    if (relevantBig5.length < 2) {
      // Even if no Big 5 attribute is interesting, you get 1 adjective.
      relevantBig5 = [big5elements[0], big5elements[1]];
    }

    var adj, adj1, adj2, adj3;

    switch (relevantBig5.length) {
      case 2:
        // Report 1 adjective.
        adj = getCircumplexAdjective(relevantBig5[0], relevantBig5[1], 0);
        sentences.push(`You are ${adj}.`);
        break;
      case 3:
        // Report 2 adjectives.
        adj1 = getCircumplexAdjective(relevantBig5[0], relevantBig5[1], 0);
        adj2 = getCircumplexAdjective(relevantBig5[1], relevantBig5[2], 1);
        sentences.push(`You are ${adj1} and ${adj2}.`);
        break;
      case 4:
      case 5:
        // Report 3 adjectives.
        adj1 = getCircumplexAdjective(relevantBig5[0], relevantBig5[1], 0);
        adj2 = getCircumplexAdjective(relevantBig5[1], relevantBig5[2], 1);
        adj3 = getCircumplexAdjective(relevantBig5[2], relevantBig5[3], 2);
        sentences.push(`You are ${adj1}, ${adj2} and ${adj3}.`);
        break;
      default:
        break;
    }

    return sentences;
  }

  function assembleFacets(personalityTree) {
    var sentences = [];
    var facetElements = [];

    // Assemble the full list of facets and sort them based on how extreme
    // is the number.
    personalityTree.children[0].children.forEach(function(p) {
      p.children.forEach(function(f) {
        facetElements.push({
          id: f.id,
          percentage: f.percentage,
          parent: p
        });
      });
    });
    facetElements.sort(compareByRelevance);

    // Assemble an adjective and description for the two most important facets.
    var info = getFacetInfo(facetElements[0]);
    sentences.push(`You are ${info.term}: ${info.description}.`);
    info = getFacetInfo(facetElements[1]);
    sentences.push(`You are ${info.term}: ${info.description}.`);

    // If all the facets correspond to the same feature, continue until a
    // different parent feature is found.
    var i = 2;
    if (facetElements[0].parent === facetElements[1].parent) {
      while (facetElements[0].parent === facetElements[i].parent) {
        i++;
      }
    }
    info = getFacetInfo(facetElements[i]);
    sentences.push(`And you are ${info.term}: ${info.description}.`);

    return sentences;
  }

  /**
   * Assemble the list of values and sort them based on relevance.
   */
  function assembleValues(valuesTree) {
    var sentences = [];
    var valuesList = [];

    valuesTree.children[0].children.forEach(function(p) {
      valuesList.push({
        id: p.id,
        percentage: p.percentage
      });
    });
    valuesList.sort(compareByRelevance);

    // Are the two most relevant in the same quartile interval? (e.g. 0%-25%)
    var sameQI = intervalFor(valuesList[0].percentage) === intervalFor(valuesList[1].percentage);

    // Get all the text and data required.
    var info1 = getInfoForValue(valuesList[0]);
    var info2 = getInfoForValue(valuesList[1]);

    var sentence;

    if (sameQI) {
      // Assemble the first 'both' sentence.
      var term1 = info1.term,
          term2 = info2.term;
      switch (intervalFor(valuesList[0].percentage)) {
        case 0:
          sentence = `You are relatively unconcerned with both ${term1} and ${term2}.`;
          break;
        case 1:
          sentence = `You don't find either ${term1} or ${term2} to be particularly motivating for you.`;
          break;
        case 2:
          sentence = `You value both ${term1} and ${term2} a bit.`;
          break;
        case 3:
          sentence = `You consider both ${term1} and ${term2} to guide a large part of what you do.`;
          break;
        default:
          break;
      }
      sentences.push(sentence);

      // Assemble the final strings in the correct format.
      sentences.push(info1.description + '.');
      sentences.push(`And ${info2.description.toLowerCase()}.`);
    } else {
      var valuesInfo = [info1, info2];
      for (var i = 0; i < valuesInfo.length; i++) {
        // Process it this way because the code is the same.
        switch (intervalFor(valuesList[i].percentage)) {
          case 0:
            sentence = `You are relatively unconcerned with ${valuesInfo[i].term}`;
            break;
          case 1:
            sentence = `You don't find ${valuesInfo[i].term} to be particularly motivating for you`;
            break;
          case 2:
            sentence = `You value ${valuesInfo[i].term} a bit more`;
            break;
          case 3:
            sentence = `You consider ${valuesInfo[i].term} to guide a large part of what you do`;
            break;
          default:
            break;
        }
        sentence = sentence.concat(': ')
          .concat(valuesInfo[i].description.toLowerCase())
          .concat('.');
        sentences.push(sentence);
      }
    }

    return sentences;
  }

  /**
   * Assemble the list of needs and sort them based on value.
   */
  function assembleNeeds(needsTree) {
    var sentences = [];
    var needsList = [];

    needsTree.children[0].children.forEach(function(p) {
      needsList.push({
        id: p.id,
        percentage: p.percentage
      });
    });
    needsList.sort(compareByValue);

    // Get the words required.
    var word = getWordsForNeed(needsList[0])[0];
    var sentence;

    // Form the right sentence for the single need.
    switch (intervalFor(needsList[0].percentage)) {
      case 0:
        sentence = `Experiences that make you feel high ${word} are generally unappealing to you.`;
        break;
      case 1:
        sentence = `Experiences that give a sense of ${word} hold some appeal to you.`;
        break;
      case 2:
        sentence = `You are motivated to seek out experiences that provide a strong feeling of ${word}.`;
        break;
      case 3:
        sentence = `Your choices are driven by a desire for ${word}.`;
        break;
      default:
          break;
    }
    sentences.push(sentence);

    return sentences;
  }

  function getCircumplexAdjective(p1, p2, order) {
    // Sort the personality traits in the order the JSON file stored it.
    var ordered = [p1, p2].sort(function(o1, o2) {
      var i1 = 'EANOC'.indexOf(o1.id.charAt(0));
      var i2 = 'EANOC'.indexOf(o2.id.charAt(0));
      return i1 < i2 ? -1 : 1;
    });

    // Assemble the identifier as the JSON file stored it.
    var identifier = ordered[0].id
      .concat(ordered[0].percentage > 0.5 ? '_plus_' : '_minus_')
      .concat(ordered[1].id)
      .concat(ordered[1].percentage > 0.5 ? '_plus' : '_minus');

    var traitMult = self.circumplexData[identifier][0];

    var sentence = `${traitMult.word}`;

    if (traitMult.perceived_negatively) {
      switch (order) {
        case 0:
          sentence = `a bit ${traitMult.word}`;
          break;
        case 1:
          sentence = `somewhat ${traitMult.word}`;
          break;
        case 2:
          sentence = `can be perceived as ${traitMult.word}`;
          break;
        default:
          break;
      }
    }

    return sentence;
  }

  function getFacetInfo(f) {
    var data = self.facetsData[f.id.replace('_', '-').replace(' ', '-')];
    var t, d;

    if (f.percentage > 0.5) {
      t = data.HighTerm.toLowerCase();
      d = data.HighDescription.toLowerCase();
    } else {
      t = data.LowTerm.toLowerCase();
      d = data.LowDescription.toLowerCase();
    }

    return {
      name: f.id,
      term: t,
      description: d
    };
  }

  function getInfoForValue(v) {
    var data = self.valuesData[v.id.replace(/[_ ]/g, '-')][0];
    var d = v.percentage > 0.5 ? data.HighDescription : data.LowDescription;

    return {
      name: v.id,
      term: data.Term.toLowerCase(),
      description: d
    };
  }

  function getWordsForNeed(n) {
    // Assemble the identifier as the JSON file stored it.
    var traitMult = self.needsData[n.id];
    return traitMult;
  }

  function intervalFor(p) {
    // The MIN handles the special case for 100%.
    return Math.min(Math.floor(p * 4), 3);
  }

  /* Exporting individual assemble functions */
  self.assembleTraits = assembleTraits;
  self.assembleFacets = assembleFacets;
  self.assembleNeeds  = assembleNeeds;
  self.assembleValues = assembleValues;

  /**
   * Given a TraitTree returns a text
   * summary describing the result.
   *
   * @param tree A TraitTree.
   * @return A String containing the text summary.
   */
  self.assemble = function (tree) {
    return [
      assembleTraits(tree.children[0]),
      assembleFacets(tree.children[0]),
      assembleNeeds (tree.children[1]),
      assembleValues(tree.children[2])
    ];
  };

  /**
   * Initializes the TextSummary module.
   * @param jsonPath The path were json files are held.
   */
  self.init = function () {
    self.loadSummaryData();
  };

  return self;

})();

export default textSummary;
