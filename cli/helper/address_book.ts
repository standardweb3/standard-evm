var path = require('path');
var fs = require('fs');

export async function recordAddress(ethers: any, contractFactory: string, address: string) {
    const chainId = (await ethers.provider.getNetwork()).chainId
    var addressBook = {}
    // Record Address book
    if(addressBook[contractFactory] === undefined) {
        addressBook[contractFactory] = {}
    }
    addressBook[contractFactory][chainId] = address
    // Save address book in cwds
    const data = JSON.stringify(addressBook)
    fs.writeFileSync(path.resolve(__dirname, "./address_book.json"), data, (err) => {
        if (err) {
            throw err;
        }
        console.log(`address is saved at ${process.cwd()}/address_book.json`);
    })
}
export function getContractInChain(chainId: number, contractFactory: string) {
    var addressBook = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./address_book.json"), 'utf8', (err) => {
        if (err) {
            throw err;
        }
    }));
    return addressBook[contractFactory][chainId]
}