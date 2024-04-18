const ELEMENT_SYMBOLS = [] ;

ELEMENT_SYMBOLS [ 1 ] = 'H' ;
// TODO: Elements 2 - 5
ELEMENT_SYMBOLS [ 6 ] = 'C' ;
ELEMENT_SYMBOLS [ 7 ] = 'N' ;
ELEMENT_SYMBOLS [ 8 ] = 'O' ;
// TODO: Elements 9 - 118


const ATOMIC_NUMBERS = {} ;


function populateAtomicNumbers () {
    for (
        const atomicNumber in ELEMENT_SYMBOLS
    ) {
        const symbol = ELEMENT_SYMBOLS [ atomicNumber ] ;

        ATOMIC_NUMBERS [ symbol ] = atomicNumber ;
    }
}


populateAtomicNumbers () ;


function getElementSymbol (
    atomicNumber
) {
    return ELEMENT_SYMBOLS [ atomicNumber ] ;
}


function normalizeAtomicNumber (
    atomicNumber
) {
    return atomicNumber / 255 ;
}


function normalizeAtomicWeight (
    atomicWeight
) {
    return Math.round (
        atomicWeight / 255
    );
}


function getAtomicNumber (
    elementSymbol
) {
    switch ( elementSymbol ) {
        default: return null ;
        case 'H': return 1 ;
        case 'C': return 6 ;
        case 'N': return 7 ;
        case 'O': return 8 ;
    }
}


function getAtomicWeight (
    elementSymbol
) {
    switch ( elementSymbol ) {
        default: return null ;
        case 'H': return 1.008 ;
        case 'C': return 12.011 ;
        case 'N': return 14.007 ;
        case 'O': return 15.999 ;
    }
}


class ChemicalElement {
    static atomicNumbers () {
        return Object.values ( ATOMIC_NUMBERS ) ;
    }


    static denormalize (
        normalizedElement
    ) {
        const atomicNumber =
            denormalizeAtomicNumber (
                normalizedElement
            )
        ;

        const symbol = getElementSymbol ( atomicNumber ) ;

        const atomicWeight =
            getAtomicWeight (
                atomicNumber
            )
        ;

        return new ChemicalElement (
            {
                symbol,
                atomicNumber,
                atomicWeight
            }
        ) ;
    }


    static getBySymbol (
        symbol
    ) {
        return ChemicalElement._registered [ symbol ] ;
    }


    static getByAtomicNumber (
        atomicNumber
    ) {
        return ChemicalElement._registeredList [ atomicNumber ] ;
    }


    static symbols () {
        return Object.values ( ELEMENT_SYMBOLS ) ;
    }


    constructor (
        options = {}
    ) {
        this.symbol = options.symbol ?? 'H' ;
        this.atomicNumber = options.atomicNumber ?? 1 ;
        this.atomicWeight = options.atomicWeight ?? 1.008 ;
    }


    normalize () {
        return normalizeAtomicNumber (
            this.atomicNumber
        ) ;
    }


    register () {
        ChemicalElement._registered[this.symbol] = this ;
        ChemicalElement._registeredList[this.atomicNumber] = this ;
    }
}


ChemicalElement._registered = {} ;
ChemicalElement._registeredList = [] ;


function registerKnownElement (
    symbol
) {
    if (typeof symbol === 'number') symbol = ELEMENT_SYMBOLS[symbol] ;

    const options = {
        symbol,
        atomicNumber: getAtomicNumber (symbol),
        atomicWeight: getAtomicWeight (symbol)
    } ;

    const element = new ChemicalElement (options) ;

    element.register () ;
}


function registerAllKnownElements () {
    registerKnownElement (1) ;

    for (
        let atomicNumber = 6 ;
        atomicNumber <= 8 ;
        atomicNumber++
    ) {
        registerKnownElement (atomicNumber) ;
    }
}


registerAllKnownElements () ;


module.exports = ChemicalElement ;
