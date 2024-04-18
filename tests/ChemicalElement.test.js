const {
    mkdir,
    writeFile
} = require("fs/promises");

const { existsSync } = require("fs");

const path = require("path");


const ChemicalElement = require ("..");


const EXPECTED_ELEMENT_COUNT = 4 ;


async function assertDatasetValidity () {
    expect (
        ChemicalElement.atomicNumbers().length
    ).toBe (
        EXPECTED_ELEMENT_COUNT
    ) ;
}


test (
    `all ${EXPECTED_ELEMENT_COUNT} supported elements are registered`,
    async () => {
        await assertDatasetValidity () ;
    }
) ;
