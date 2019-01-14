var assert = require('assert'),
    equals = require('array-equal'),
    akDataNaics = require('./index.js');

describe('Get Group Tests', function () {
  it('valid 2017 group returned when no edition passed', function () {
    var group = akDataNaics.getGroup('447'),
        isValid = true;

    if (group.code !== '447') {
      isValid = false;
    }

    assert.equal(isValid, true);
  });
  it('2012 group removed from 2017 returns undefined when no edition passed', function () {
    var group = akDataNaics.getGroup('212231'),
        isValid = false;

    if (typeof group === 'undefined') {
      isValid = true;
    }

    assert.equal(isValid, true);
  });
  it('2012 group removed from 2017 returns value when 2012 edition passed', function () {
    var group = akDataNaics.getGroup('212231', '2012'),
        isValid = true;

    if (typeof group === 'undefined') {
      isValid = false;
    }
    if (group.code !== '212231') {
      isValid = false;
    }

    assert.equal(isValid, true);
  });
  it('2007 group returns value', function () {
    var group = akDataNaics.getGroup('7221', '2007'),
        isValid = true;

    if (typeof group === 'undefined') {
      isValid = false;
    }
    if (group.code !== '7221') {
      isValid = false;
    }

    assert.equal(isValid, true);
  });
  it('2002 group returns value', function () {
    var group = akDataNaics.getGroup('51811', '2002'),
        isValid = true;

    if (typeof group === 'undefined') {
      isValid = false;
    }
    if (group.code !== '51811') {
      isValid = false;
    }

    assert.equal(isValid, true);
  });
  it('Unsupported edition throws error', function () {
    assert.throws(
      function () {
        akDataNaics.getGroup('51811', '1953');
      },
      Error,
      'group data not available for requested edition');
  });

});
describe('Get Groups Tests', function () {
  it('2017 groups returned when no edition passed', function () {
    var groups = akDataNaics.getGroups(),
        numGroups = Object.keys(groups).length;

    assert.equal(numGroups, 2196);
  });
  it('All 2196 groups from 2017 edition returned', function () {
    var groups = akDataNaics.getGroups('2017'),
        numGroups = Object.keys(groups).length;

    assert.equal(numGroups, 2196);
  });
  it('All 2209 groups from 2012 edition returned', function () {
    var groups = akDataNaics.getGroups('2012'),
        numGroups = Object.keys(groups).length;

    assert.equal(numGroups, 2209);
  });
  it('All 2328 groups from 2007 edition returned', function () {
    var groups = akDataNaics.getGroups('2007'),
        numGroups = Object.keys(groups).length;

    assert.equal(numGroups, 2328);
  });
  it('All 2341 groups from 2002 edition returned', function () {
    var groups = akDataNaics.getGroups('2002'),
        numGroups = Object.keys(groups).length;

    assert.equal(numGroups, 2341);
  });
  it('Unsupported edition throws error', function () {
    assert.throws(
      function () {
        akDataNaics.getDescription('51811', '2002');
      },
      Error,
      'group data not available for requested edition');
  });

});
describe('Get Group Description Tests', function () {
  it('valid 2017 group description returned when no edition passed', function () {
    var description = akDataNaics.getGroupDescription('447'),
        isValid = true;

    if (!description.includes('Industries in the Gasoline Stations subsector retail automotive fuels')) {
      isValid = false;
    }

    assert.equal(isValid, true);
  });
  it('2012 group removed from 2017 returns undefined description when no edition passed', function () {
    var description = akDataNaics.getGroupDescription('212231'),
        isValid = false;

    if (typeof description === 'undefined') {
      isValid = true;
    }

    assert.equal(isValid, true);
  });
  it('2012 group removed from 2017 returns description when 2012 edition passed', function () {
    var description = akDataNaics.getGroupDescription('212231', '2012') || '',
        isValid = false;

    if (description.includes('This U.S. industry comprises establishments primarily engaged in developing the mine site')) {
      isValid = true;
    }

    assert.equal(isValid, true);
  });
  it('Unsupported edition throws error', function () {
    assert.throws(
      function () {
        akDataNaics.getDescription('51811', '2002');
      },
      Error,
      'group data not available for requested edition');
  });

});
describe('Get Group Descriptions Tests', function () {
  it('all 2017 group descriptions returned when no edition passed', function () {
    var descriptions = akDataNaics.getGroupDescriptions();

    assert.equal(Object.keys(descriptions).length, 2196);
  });
  it('2017 descriptions contains expected content', function () {
    var descriptions = akDataNaics.getGroupDescriptions('2017'),
        description = descriptions['2122'];

    assert.equal(
      description,
      'This industry group comprises establishments primarily engaged in developing mine sites or mining metallic minerals, and establishments primarily engaged in ore dressing and beneficiating (i.e., preparing) operations, such as crushing, grinding, washing, drying, sintering, concentrating, calcining, and leaching. Beneficiating may be performed at mills operated in conjunction with the mines served or at mills, such as custom mills, operated separately.'
    );
  });
  it('all 2012 group descriptions returned', function () {
    var descriptions = akDataNaics.getGroupDescriptions('2012');

    assert.equal(Object.keys(descriptions).length, 2209);
  });
  it('Unsupported edition throws error', function () {
    assert.throws(
      function () {
        akDataNaics.getDescription('51811', '2002');
      },
      Error,
      'group data not available for requested edition');
  });

});
describe('Get Group History Tests', function () {
  it('group 7222 last appeared in 2007', function () {
    var lastAppeared = akDataNaics.getGroupHistory('7222')['last-appeared'];
    assert.equal(lastAppeared, '2007');
  });
  it('group 32229 in all editions', function () {
    assert.equal(akDataNaics.getGroupHistory('32229')['all-editions'], true);
  });
  it('group 45399 in all editions', function () {
    assert.equal(akDataNaics.getGroupHistory('45399')['all-editions'], true);
  });
  it('group 51222 not in all editions', function () {
    assert.equal(akDataNaics.getGroupHistory('51222')['all-editions'], false);
  });

});

describe('Get Code Tests', function () {
  it('valid 2017 code returned when no edition passed', function () {
    var hash = akDataNaics.getCode('c1276fc7ce9e8e5bdc9c73fe792993fb'),
        isValid = true;

    if (hash.code !== '423490') {
      isValid = false;
    }

    assert.equal(isValid, true);
  });
  it('2012 code removed from 2017 returns undefined when no edition passed', function () {
    var hash = akDataNaics.getCode('00f3da5548df3b6daa8db8674d181001'),
        isValid = true;

    if (typeof hash === 'undefined') {
      isValid = true;
    }

    assert.equal(isValid, true);
  });
  it('2012 hash removed from 2017 returns value when 2012 edition passed', function () {
    var hash = akDataNaics.getCode('00f3da5548df3b6daa8db8674d181001', '2012'),
        isValid = false;

    if (typeof hash !== 'undefined') {
      isValid = true;
    }

    assert.equal(isValid, true);
  });
  it('Unsupported edition throws error', function () {
    assert.throws(
      function () {
        akDataNaics.getCode('00f3da5548df3b6daa8db8674d181001', '2002');
      },
      Error,
      'hash data not available for requested edition');
  });
});
describe('Get Codes Tests', function () {
  it('2017 codes returned', function () {
    var codes = akDataNaics.getCodes('2017');

    assert.equal(codes ? true : false, true);
  });
  it('2017 codes contains expected data', function () {
    var description = akDataNaics.getCodes('2017')['114883b9625d67012b3c2ccf6b1def23'].description;

    assert.equal(description, 'Libraries, video tape, stock footage');
  });
  it('Unsupported edition throws error', function () {
    assert.throws(
      function () {
        akDataNaics.getCodes('2002');
      },
      Error,
      'codes not available for requested edition');
  });

});
describe('Get Group Numbers Represented by Codes Tests', function () {
  it('2017 Hashes for group 33395 and Sector 11 correctly identified', function () {
    var codes11 = akDataNaics.getGroup('11').codes, //.codes.concat(akDataNaics.getGroup('33395').codes),
        codes33395 = akDataNaics.getGroup('33995').codes, //.codes.concat(akDataNaics.getGroup('33395').codes),
        codes = codes11.concat(codes33395),
        data = akDataNaics.getGroupNumsRepresentedByCodes(codes);

    assert.equal(data.groups.length === 2 &&
                  data.remaining.length === 0 &&
                  data.groups.indexOf('11') !== -1 &&
                  data.groups.indexOf('33995') !== -1 ? true : false, true);
  });
  it('All 2012 Hashes return 20 sector codes and no remainder', function () {
    var hashes = akDataNaics.getHashes('2012'),
        data = akDataNaics.getGroupNumsRepresentedByCodes(hashes, '2012');

    assert.equal(data.groups.length === 20 &&
                  data.remaining.length === 0  ? true : false, true);
  });
  it('All 2017 Hashes return 20 sector codes and no remainder', function () {
    var hashes = akDataNaics.getHashes(),
        data = akDataNaics.getGroupNumsRepresentedByCodes(hashes);

    assert.equal(data.groups.length === 20 &&
                  data.remaining.length === 0  ? true : false, true);
  });
  it('Large list of codes', function () {
    var hashes = require('./_test/hash-array.json'),
        data = akDataNaics.getGroupNumsRepresentedByCodes(hashes);

    assert.equal(data.groups.length === 2 &&
                  data.remaining.length === 272  ? true : false, true);
  });
  it('Select Hashes from documentation', function () {
    var hashes = [
          'b1670e3672b5a0e0308febf8c912f775',
          'b436099d780de5251457973933c75ae8',
          'c365dadf733bd5191086189bb8bc04ac',
          '6d5a4b7b30122163f055bb22c26cfa73',
          '9b6118fdd65beffc2d9021fd2ad41a78'
        ],
        data = akDataNaics.getGroupNumsRepresentedByCodes(hashes);

    assert.equal(data.groups.length === 1 &&
                  data.remaining.indexOf('9b6118fdd65beffc2d9021fd2ad41a78') === 0  ? true : false, true);
  });

});

describe('Get Sector Tests', function () {
  it('2017 sector available', function () {
    var sector = akDataNaics.getSector('44-45'),
        isValid = false;

    if (sector) {
      isValid = true;
    }

    assert.equal(isValid, true);
  });
  it('2017 manufacturing sector has expected number of class codes', function () {
    var sector = akDataNaics.getSector('31-33');
    assert.equal(sector.codes.length, 10106);
  });
  it('2012 sector returns expected data', function () {
    var sector = akDataNaics.getSector('11', '2012');

    assert.equal(sector.title, 'Agriculture, Forestry, Fishing and Hunting');
  });
  it('Unsupported edition throws error', function () {
    assert.throws(
      function () {
        akDataNaics.getSector('21', '2002');
      },
      Error,
      'sector data not available for requested edition');
  });

});
describe('Get Sectors Tests', function () {
  it('Default edition sectors returned', function () {
    var sectors = akDataNaics.getSectors();
    assert.equal(Object.keys(sectors).length, 20);
  });
  it('2017 sectors returned', function () {
    var sectors = akDataNaics.getSectors('2017');
    assert.equal(Object.keys(sectors).length, 20);
  });
  it('2012 sectors returned', function () {
    var sectors = akDataNaics.getSectors('2012');
    assert.equal(Object.keys(sectors).length, 20);
  });
  it('Unsupported edition throws error', function () {
    assert.throws(
      function () {
        akDataNaics.getSectors('2007');
      },
      Error,
      'sector data not available for requested edition');
  });

});

describe('Get Path Array Tests', function () {
  it('six digit naics should return a path array with five elements', function () {
    var path = akDataNaics.getPathArray('333415'); //[ '31-33', '333', '3334', '33341', '333415' ]
    assert.equal(path.length, 5);
  });
  it('six digit naics path array has expected values', function () {
    var path = akDataNaics.getPathArray('333415'),
        expected = ['31-33', '333', '3334', '33341', '333415'],
        isValid = true;

    path.forEach(function (value, index) {
      if (expected[index] !==  value) {
        isValid = false;
      }
    });

    assert.equal(isValid, true);
  });
  it('two digit naics should return a path array with one elements', function () {
    var path = akDataNaics.getPathArray('31-33');
    assert.equal(path.length, 1);
  });
});
describe('Get Path Object Tests', function () {
  it('six digit naics returns expected path object', function () {
    var path = akDataNaics.getPathObject('333415'),
        keys = Object.keys(path),
        expected = {
          sector: '31-33',
          subsector: '333',
          industryGroup: '3334',
          internationalIndustry: '33341',
          nationalIndustry: '333415'
        },
        isValid = true;

    keys.forEach(function (key) {
      if (path[key] !== expected[key]) {
        isValid = false;
      }
    });

    assert.equal(isValid, true);
  });
  it('two digit naics returns expected path object', function () {
    var path = akDataNaics.getPathObject('31-33'),
        keys = Object.keys(path),
        expected = {
          sector: '31-33'
        },
        isValid = true;

    keys.forEach(function (key) {
      if (path[key] !== expected[key]) {
        isValid = false;
      }
    });

    assert.equal(isValid, true);
  });
  it('trhee digit naics returns undefined industry group attribute', function () {
    var path = akDataNaics.getPathObject('333'),
        isValid = true;

    if (path.industryGroup) {
      isValid = false;
    }
    assert.equal(isValid, true);
  });
  it('four digit naics returns expected number of properties', function () {
    var path = akDataNaics.getPathObject('3334'),
        keys = Object.keys(path);

    assert.equal(keys.length, 5);
  });
});
describe('Get All Descendants Tests', function () {
  it('expected descendants for group when edition not specified', function () {
    var descendants = akDataNaics.getAllDescendants('447');
    assert.equal(descendants.length, 5);
  });
  it('expected descendants for 2017 group that changed since last edition', function () {
    var descendants = akDataNaics.getAllDescendants('31-33');
    assert.equal(descendants.length, 647);
  });
  it('expected descendants for 2012 group that changed in future edition', function () {
    var descendants = akDataNaics.getAllDescendants('31-33', '2012');
    assert.equal(descendants.length, 651);
  });
  it('expected descendants for 2007 group', function () {
    var descendants = akDataNaics.getAllDescendants('33122', '2007');
    assert.equal(descendants.length, 2);
  });
  it('expected descendants for retail in 2002', function () {
    var descendants = akDataNaics.getAllDescendants('44-45', '2002');
    assert.equal(descendants.length, 175);
  });
  it('expected descendants for retail in 2007', function () {
    var descendants = akDataNaics.getAllDescendants('44-45', '2007');
    assert.equal(descendants.length, 175);
  });
  it('expected descendants for retail in 2012', function () {
    var descendants = akDataNaics.getAllDescendants('44-45', '2012');
    assert.equal(descendants.length, 166);
  });
  it('expected descendants for retail in 2017', function () {
    var descendants = akDataNaics.getAllDescendants('44-45', '2017');
    assert.equal(descendants.length, 162);
  });
  it('Unsupported edition throws error', function () {
    assert.throws(
      function () {
        akDataNaics.getAllDescendants('44-45', '1997');
      },
      Error,
      'group data not available for requested edition');
  });

});
describe('Detect Type Tests', function () {
  it('hyphenated sector', function () {
    var type = akDataNaics.detectType('44-45');
    assert.equal(type, 'sector');
  });
  it('non-hyphenated sector', function () {
    var type = akDataNaics.detectType('11');
    assert.equal(type, 'sector');
  });
  it('subsector', function () {
    var type = akDataNaics.detectType('111');
    assert.equal(type, 'subsector');
  });
  it('industry group', function () {
    var type = akDataNaics.detectType('1111');
    assert.equal(type, 'industry-group');
  });
  it('international industry', function () {
    var type = akDataNaics.detectType('11111');
    assert.equal(type, 'international-industry');
  });
  it('national industry', function () {
    var type = akDataNaics.detectType('111110');
    assert.equal(type, 'national-industry');
  });
  it('hash', function () {
    var type = akDataNaics.detectType('0b11b51241da58ad7d642f08295f55ac');
    assert.equal(type, 'code');
  });
  it('invalid value', function () {
    var type = akDataNaics.detectType('this is a test');
    assert.equal(type, 'UNKNOWN');
  });
});

describe('Get Hashes Tests', function () {
  it('2017 hashes returned as default', function () {
    var hashes = akDataNaics.getHashes();

    assert.equal(hashes.length, 20060);
  });
  it('2017 hashes returned with expected count', function () {
    var hashes = akDataNaics.getHashes('2017');

    assert.equal(hashes.length, 20060);
  });
  it('2012 hashes returned with expected count', function () {
    var hashes = akDataNaics.getHashes('2012');

    assert.equal(hashes.length, 19255);
  });
  it('Unsupported edition throws error', function () {
    assert.throws(
      function () {
        akDataNaics.getHashes('2002');
      },
      Error,
      'codes not available for requested edition');
  });

});

describe('Get Type Summary Tests', function () {
  it('default type summary returned', function () {
    var typeSummary = akDataNaics.getTypeSummary();

    assert.equal(typeSummary ? true : false, true);
  });
  it('2017 type summary returned with expected values', function () {
    var typeSummary = akDataNaics.getTypeSummary('2017'),
        numSectors = Object.keys(typeSummary.sector).length,
        numSubsectors = Object.keys(typeSummary.subsector).length,
        numIndustryGroups = Object.keys(typeSummary['industry-group']).length,
        numIntlIndustries = Object.keys(typeSummary['international-industry']).length,
        numNatlIndustries = Object.keys(typeSummary['national-industry']).length,
        total = numSectors + numSubsectors + numIndustryGroups + numIntlIndustries + numNatlIndustries;

    assert.equal(total, 2196);
  });
  it('2012 type summary returned with expected values', function () {
    var typeSummary = akDataNaics.getTypeSummary('2012'),
        numSectors = Object.keys(typeSummary.sector).length,
        numSubsectors = Object.keys(typeSummary.subsector).length,
        numIndustryGroups = Object.keys(typeSummary['industry-group']).length,
        numIntlIndustries = Object.keys(typeSummary['international-industry']).length,
        numNatlIndustries = Object.keys(typeSummary['national-industry']).length,
        total = numSectors + numSubsectors + numIndustryGroups + numIntlIndustries + numNatlIndustries;

    assert.equal(total, 2209);
  });
  it('Unsupported edition throws error', function () {
    assert.throws(
      function () {
        akDataNaics.getTypeSummary('2002');
      },
      Error,
      'codes not available for requested edition');
  });

});

describe('Map Group to Adjacent Edition Tests', function () {
  it('map 2017 code to 2012', function () {
    var mapping = akDataNaics.mapGroupToAdjacentEdition('53228', '2017', 'backward'),
        expectedMapping = ['53222', '53223', '53229'];

    assert.equal(equals(mapping, expectedMapping), true);
  });
  it('map 2012 code to 2017', function () {
    var mapping = akDataNaics.mapGroupToAdjacentEdition('452910', '2012', 'forward'),
        expectedMapping = ['452311'];

    assert.equal(equals(mapping, expectedMapping), true);
  });
  it('map 2012 code to 2007', function () {
    var mapping = akDataNaics.mapGroupToAdjacentEdition('31524', '2012', 'backward'),
        expectedMapping = ['31523', '31529'];

    assert.equal(equals(mapping, expectedMapping), true);
  });
  it('map 2007 code to 2012', function () {
    var mapping = akDataNaics.mapGroupToAdjacentEdition('322226', '2007', 'forward'),
        expectedMapping = ['322220'];

    assert.equal(equals(mapping, expectedMapping), true);
  });
  it('map 2007 code to 2002', function () {
    var mapping = akDataNaics.mapGroupToAdjacentEdition('314999', '2007', 'backward'),
        expectedMapping = ['314999', '315211', '315212'];

    assert.equal(equals(mapping, expectedMapping), true);
  });
  it('Out of range ending edition throws error (2002 backward)', function () {
    assert.throws(
      function () {
        akDataNaics.mapGroupToAdjacentEdition('314999', '2002', 'backward');
      },
      Error,
      'mapping data not available for requested edition');
  });
  it('Out of range ending edition throws error (2017 forward)', function () {
    assert.throws(
      function () {
        akDataNaics.mapGroupToAdjacentEdition('11', '2017', 'forward');
      },
      Error,
      'mapping data not available for requested edition');
  });
  it('Unsupported starting edition throws error', function () {
    assert.throws(
      function () {
        akDataNaics.mapGroupToAdjacentEdition('314999', '1997', 'backward');
      },
      Error,
      'mapping data not available for requested edition');
  });
});

describe('Map 2012 Hash to 2017 Hashes Test', function () {

  it('Theater, property operation, rental or leasing', function () {
    var mapping = akDataNaics.map2012Hashto2017('026841806ea8835322d9c9893a96cca2');

    assert.equal(mapping, '3df9480f67cb3fb67d42fd0f0c40ca02');
  });
  it('Rubber stamps, merchant wholesalers', function () {
    var mapping = akDataNaics.map2012Hashto2017('1175ca71c5e5e5e2789ba137676ecb32');

    assert.equal(mapping, '9edcd47cb3428525bb511d0ceae605b9');
  });

});

describe('Get Hash Mappings', function () {

  it('2012 -> 2017', function () {
    var numMappings = Object.keys(akDataNaics.getHashMappings('2012', '2017')).length;

    assert.equal(numMappings, 700);
  });
  it('2017 -> 2012', function () {
    assert.throws(
      function () {
        akDataNaics.getHashMappings('2017', '2012');
      },
      Error,
      'hash mappings not available for requested range');
  });
  it('2012 -> 2007', function () {
    assert.throws(
      function () {
        akDataNaics.getHashMappings('2012', '2007');
      },
      Error,
      'hash mappings not available for requested range');
  });
});

describe('Get Group Mappings', function () {

  it('2017 -> 2012', function () {
    var numMappings = Object.keys(akDataNaics.getGroupMappings('2017', '2012')).length;

    assert.equal(numMappings, 29);
  });
  it('2012 -> 2017', function () {
    var numMappings = Object.keys(akDataNaics.getGroupMappings('2012', '2017')).length;

    assert.equal(numMappings, 43);
  });
  it('2012 -> 2007', function () {
    var numMappings = Object.keys(akDataNaics.getGroupMappings('2012', '2007')).length;

    assert.equal(numMappings, 95);
  });
  it('2007 -> 2012', function () {
    var numMappings = Object.keys(akDataNaics.getGroupMappings('2007', '2012')).length;

    assert.equal(numMappings, 207);
  });
  it('2007 -> 2002', function () {
    var numMappings = Object.keys(akDataNaics.getGroupMappings('2007', '2002')).length;

    assert.equal(numMappings, 28);
  });
  it('2002 -> 2007', function () {
    var numMappings = Object.keys(akDataNaics.getGroupMappings('2002', '2007')).length;

    assert.equal(numMappings, 31);
  });
  it('2002 -> 1997', function () {
    assert.throws(
      function () {
        akDataNaics.getGroupMappings('2002', '1997');
      },
      Error,
      'group mappings not available for requested range');
  });
  it('2017 -> 2022', function () {
    assert.throws(
      function () {
        akDataNaics.getGroupMappings('2017', '2022');
      },
      Error,
      'group mappings not available for requested range');
  });
});

describe('Get Economic Census', function () {
  it('default', function () {
    var census = akDataNaics.getEconomicCensus();

    assert.equal((census ? true : false), true);
  });

  it('2012', function () {
    var census = akDataNaics.getEconomicCensus('2012'),
        numRecords = Object.keys(census).length;

    assert.equal(numRecords, 1638);
  });
  it('2007', function () {
    var census = akDataNaics.getEconomicCensus('2007'),
        numRecords = Object.keys(census).length;

    assert.equal(numRecords, 2037);
  });
  it('edition not available', function () {
    assert.throws(
      function () {
        akDataNaics.getEconomicCensus('2017');
      },
      Error,
      'economic census data not available for requested edition');
  });
});
describe('Get Economic Census for Group', function () {

  it('Number of Household refrigerator and home freezer manufacturing establishments in 2012', function () {
    var numEstablishments = akDataNaics.getEconomicCensusForGroup('335221', '2012').numEstablishments;
    assert.equal(numEstablishments, 88);
  });
  it('Number of Retail Trade establishments in 2007', function () {
    var numEstablishments = akDataNaics.getEconomicCensusForGroup('44-45', '2007').numEstablishments;
    assert.equal(numEstablishments, 1128112);
  });
  it('edition not available', function () {
    assert.throws(
      function () {
        akDataNaics.getEconomicCensusForGroup('44-45', '2002');
      },
      Error,
      'economic census data not available for requested edition');
  });
});
