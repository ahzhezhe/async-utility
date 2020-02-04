# **async-utils** 

[![npm package](https://img.shields.io/npm/v/async-utils/latest.svg)](https://www.npmjs.com/package/async-utils)
[![npm downloads](https://img.shields.io/npm/dt/async-utils.svg)](https://www.npmjs.com/package/async-utils)
![GitHub test](https://github.com/ahzhezhe/async-utils/workflows/test/badge.svg?branch=master)
[![GitHub issues](https://img.shields.io/github/issues/ahzhezhe/async-utils.svg)](https://github.com/ahzhezhe/async-utils)

Use Node.js to generate Terraform plan.

You do not need to have Terraform installed to use this module.

The end result of using this module is Terraform plan in plain text, you will need to write the text into a file and execute it yourself.

Currently support generating plan for Terraform version 0.11 and 0.12.

## **Disclamer**

This module is still in development and testing phase, it might not work fully correctly. Feel free to report issues/bugs, make requests or give suggesstions in GitHub page.

## **Benefit**

Make use of all Javascript programming features (some of which is not available in Terraform), e.g. functions, array, loops, if-else, map, etc. to generate a plain Terraform plan.

You can easily maintain your infra in Javascript/Typescript.

You don't need to use Terraform variables, you can use your own Javascript/JSON variables or use dot env. 

You don't need to use Terraform modules for reusable resource creations, you can make use of Javascript functions.

## **Limitation**

The generated plan is unformatted and its validity is not verified, use `terraform fmt` and `terraform plan` to format it and check its validity yourself.

## **Install via NPM**

```
npm install async-utils
```

## **Usage**

### **Initiate TerraformGenerator**
```javascript
const tfg = new TerraformGenerator({ version: '0.12' });
```

### **Block**
Block's arguments are not typed, please refer to official Terraform documentation on what arguments can be supplied.

```javascript
tfg.addProvider('aws', {
  region: 'ap-southeast-1',
  profile: 'example'
});

const vpc = tfg.addResource('aws_vpc', 'vpc', {
  cidr_block: '172.88.0.0/16'
});
```

### **Argument Types**
```javascript
{
  string: 'str',
  number: 123,
  boolean: true,
  stringList: ['str1', 'str2', 'str3'],
  numberList: [111, 222, 333],
  booleanList: [true, false, true],
  tuple: ['str', 123, true],
  object: {
    arg1: 'str',
    arg2: 123,
    arg3: true
  },
  objectList: [
    {
      arg1: 'str'
    },
    {
      arg1: 'str'
    }
  ],
  map: new Map({
    arg1: 'str',
    arg2: 123,
    arg3: true
  }),
  block: block,
  blockAttribute: block.getAttribute('attrName'),
  heredoc: new Heredoc(`line1
                        line2
                        line3`);
  custom1: new Argument('max(5, 12, 9)'),
  custom2: new Argument('sort("a", ', block.getAttribute('attrName'), ', "c")')
}
```

### **Attribute**
```javascript
block.getAttribute('id')                 // block id, string
block.getAttribute('subnets')            // subnet objects, object list
block.getAttribute('subnets.*.id')       // subnet ids, string list
block.getAttribute('subnets.*.id[0]')    // first subnet id, string
```

### **Generate Terraform plan**
```javascript
tfg.generate();
```

## **Example**
```javascript
import TerraformGenerator, { Provider, Resource, DataSource, Output, Map } from 'async-utils';
import fs from 'fs';
import path from 'path';

// Constants
const project = 'example';

// Environment variables
const configs = {
  env: 'dev',
  tiers: [
    {
      name: 'web',
      cidr: '172.88.100.0/22',
      subnetCidrs: ['172.88.100.0/24', '172.88.101.0/24', '172.88.102.0/24']
    },
    {
      name: 'app',
      cidr: '172.88.104.0/22',
      subnetCidrs: ['172.88.104.0/24', '172.88.105.0/24', '172.88.106.0/24']
    },
    {
      name: 'db',
      cidr: '172.88.108.0/22',
      subnetCidrs: ['172.88.108.0/24', '172.88.109.0/24', '172.88.110.0/24']
    }
  ]
};

// Utility functions
const getAvailabilityZone = (i: number): string => {
  if (i === 0) {
    return 'ap-southeast-1a';
  } else if (i === 1) {
    return 'ap-southeast-1b';
  } else {
    return 'ap-southeast-1c';
  }
};

const getTagName = (type: string, name?: string): string =>
  `${type}-${project}-${configs.env}${name ? `-${name}` : ''}`;

const getTags = (type: string, name?: string): Map => new Map({
  Name: getTagName(type, name),
  Project: project,
  Env: configs.env
});

// Start writing Terraform plan
const tfg = new TerraformGenerator({ version: '0.12' });

// Configure provider
tfg.addProvider('aws', {
  region: 'ap-southeast-1',
  profile: 'example'
});

// Find VPC by name
const vpc = tfg.addDataSource('aws_vpc', 'vpc', {
  filter: [{
    name: 'tag:Name',
    values: [getTagName('vpc')]
  }]
});

const subnets = {
  web: [],
  app: [],
  db: []
};

// Create 3-tiers, each tier has 3 subnets spread across availabilty zones
configs.tiers.forEach(tier => {
  tier.subnetCidrs.forEach((cidr, i) => {
    const name = `${tier.name}${i}`;
    const subnet = tfg.addResource('aws_subnet', `subnet_${name}`, {
      vpc_id: vpc.getAttribute('id'),
      cidr_block: cidr,
      availability_zone: getAvailabilityZone(i),
      tags: getTags('subnet', name)
    });
    subnets[tier.name].push(subnet);
  });
});

// Output all subnet ids
tfg.addOutput('subnets', {
  value: new Map({
    webSubnets: subnets.web.map(subnet => subnet.getAttribute('id')),
    appSubnets: subnets.app.map(subnet => subnet.getAttribute('id')),
    dbSubnets: subnets.db.map(subnet => subnet.getAttribute('id'))
  })
});

// Write the plan into a terraform.tf file
const outputPath = path.join('output', configs.env, 'subnets', 'terraform.tf');
fs.writeFileSync(outputPath, tfg.generate());
```