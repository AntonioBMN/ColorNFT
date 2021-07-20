const { assert, expect } = require('chai');

const Color = artifacts.require('./Color.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Color',(accounts) => {
    let contract;
    before(async()=>{
        contract = await Color.deployed();
    })

    describe('deployment',async() => {
        it('deploys successfully', async() => {
            
            const address = contract.address;
            assert.notEqual(address, '0x0', "Não é vazio!")
            assert.notEqual(address, '', "Não é vazio!")
            assert.notEqual(address, 'null', "Não é vazio!")
            assert.notEqual(address, 'undefined', "Não é vazio!")
        })
        it('tem um nome', async() =>{
            const name = await contract.name()
            assert.equal(name,'Color')
        })

        it('tem um simbolo', async() =>{
            const symbol = await contract.symbol()
            assert.equal(symbol, 'COLOR')
        })
    })

    describe('minting',async() => {
        it('creates a new token', async() => {
            const result = await contract.mint('#EC058E');
            const totalSupply = await contract.totalSupply();
            //Sucesso
            assert.equal(totalSupply, 1, 'TotalSupply correto');
            const event = result.logs[0].args
            assert.equal(event.tokenId.toNumber(), 1, 'Id correto')
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'From tá correto')
            assert.equal(event.to, accounts[0], 'To tá correto')
            //Fracasso: Mesma cor duas vezes;
            await contract.mint('#EC058E').should.be.rejected;
        })
    })

    describe('indexing', async()=>{
        it('lista mais 3 tokens', async()=>{
            await contract.mint('#5452E3')
            await contract.mint('#FFFFFF')
            await contract.mint('#000000')
            const totalSupply = await contract.totalSupply();

            let color;
            let result = [];

            for(var i = 0 ; i <totalSupply; i++){
                color = await contract.colors(i)
                result.push(color)
            }
            let expected = ["#EC058E","#5452E3","#FFFFFF", "#000000"];
            assert.equal(result.join(','), expected.join(','))
        })
    })
})