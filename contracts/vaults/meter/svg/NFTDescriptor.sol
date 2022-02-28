// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "base64-sol/base64.sol";
import "./libraries/NFTSVG.sol";
import "./interfaces/INFTSVG.sol";
import "./interfaces/INFTConstructor.sol";
import "../interfaces/IVault.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

interface IERC20Metadata {
  function symbol() external view returns (string memory);
  function name() external view returns (string memory);
}

contract NFTDescriptor is INFTSVG {
  using Strings for uint256;
  address NFTConstructor;

  constructor(address constructor_) {
    NFTConstructor = constructor_;
  }

  // You could also just upload the raw SVG and have solildity convert it!
  function svgToImageURI(
    string memory tokenId,
    NFTSVG.ChainParams memory cParams,
    NFTSVG.BlParams memory blParams,
    NFTSVG.HealthParams memory hParams,
    NFTSVG.CltParams memory cltParams
  ) public pure returns (string memory imageURI) {
    // example:
    // <svg width='500' height='500' viewBox='0 0 285 350' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill='black' d='M150,0,L75,200,L225,200,Z'></path></svg>
    // data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNTAwJyBoZWlnaHQ9JzUwMCcgdmlld0JveD0nMCAwIDI4NSAzNTAnIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZmlsbD0nYmxhY2snIGQ9J00xNTAsMCxMNzUsMjAwLEwyMjUsMjAwLFonPjwvcGF0aD48L3N2Zz4=

    string memory svgBase64Encoded = Base64.encode(
      bytes(
        string(
          abi.encodePacked(
            NFTSVG.generateSVGWithoutImages(tokenId, cParams, blParams, hParams, cltParams)
          )
        )
      )
    );
    imageURI = string(
      abi.encodePacked("data:image/svg+xml;base64,", svgBase64Encoded)
    );
  }

  // You could also just upload the raw SVG and have solildity convert it!
  function svgWithoutImages(uint256 tokenId_)
    public
    view
    returns (string memory svg)
  {
    (
      NFTSVG.ChainParams memory cParams,
      NFTSVG.BlParams memory blParams,
      NFTSVG.HealthParams memory hParams,
      NFTSVG.CltParams memory cltParams
    ) = INFTConstructor(NFTConstructor).generateParams(tokenId_);
    svg = NFTSVG.generateSVGWithoutImages(tokenId_.toString(), cParams, blParams, hParams, cltParams);
  }

  function formatNumericTrait(string memory traitType, string memory value) internal pure returns (string memory trait) {
    trait = string(
        abi.encodePacked(
          '{',
            '"trait_type": "',
            traitType,
            '",' 
            '"value": ',
            value,
          '}'
        )
    );
  }

  function formatTrait(string memory traitType, string memory value) internal pure returns (string memory trait) {
    trait = string(
        abi.encodePacked(
          '{',
            '"trait_type": "',
            traitType,
            '",' 
            '"value": "',
            value,
            '"',
          '}'
        )
    );
  }

   function formatDisplay(string memory displayType, string memory traitType, string memory value) internal pure returns (string memory trait) {
    trait = string(
        abi.encodePacked(
          '{',
            '"display_type": "',
            displayType,
            '",'
            '"trait_type": "',
            traitType,
            '",' 
            '"value": "',
            value,
            '"',
          '}'
        )
    );
  }

  function formatTokenAttributes(
    NFTSVG.BlParams memory blParam,
    NFTSVG.HealthParams memory hParam,
    NFTSVG.CltParams memory cltParam) internal pure returns (bytes memory attributes) {
      bytes memory attributes1=
        abi.encodePacked(
                '"attributes": [',
                formatNumericTrait('Collateral Amount', blParam.cBlStr),
                ',',
                formatDisplay('date', 'Last Updated', blParam.lastUpdated),
                ',',
                formatTrait('Collateral', blParam.name),
                ',',
                formatTrait('IOU', 'MeterUSD'),
                ',',                
                formatTrait('HP Status', hParam.HPStatus),
                ',',
                formatNumericTrait('IOU Amount', blParam.dBlStr),
                ','
        );
      attributes = abi.encodePacked(
        attributes1,
        formatNumericTrait('HP', hParam.rawHP.toString()),
        ',',
        formatTrait('Min. Collateral Ratio', 
        string(
          abi.encodePacked(
            cltParam.MCR,
            "%"
          ))),
        ',',
        formatTrait('Liquidation Fee',
        string(
          abi.encodePacked(
            cltParam.LFR,
            "%"
          ))),
        ',',
        formatTrait('Stability Fee',
        string(
          abi.encodePacked(
            cltParam.SFR,
            "%"
          ))),
        ']'
      );
    }

  function formatTokenURI(
    uint256 tokenId,
    NFTSVG.ChainParams memory cParam,
    NFTSVG.BlParams memory blParam,
    NFTSVG.HealthParams memory hParam,
    NFTSVG.CltParams memory cltParam
  ) internal pure returns (string memory) {
    bytes memory image = abi.encodePacked(
      '{"name":"',
      'VaultOne #',
      tokenId.toString(),
      '",',
      '"description":"VaultOne represents the ownership of',
      " one's financial rights written in an immutable smart contract. ",
      "Only the holder can manage and interact with the funds connected to its immutable smart contract",
      '",',
      //https://artsandscience.standard.tech/nft/V1/4/0
      '"image": "https://raw.githubusercontent.com/digitalnativeinc/nft-arts/main/V1/backgrounds/1088.png",',
      '"image_url": "https://artsandscience.standard.tech/nft/V1/',
      cParam.chainId,
      '/',
      tokenId.toString(),
      '.svg",',
      formatTokenAttributes(blParam, hParam, cltParam),
      ','          
    );
    return
      string(
        abi.encodePacked(
          "data:application/json;base64,",
          Base64.encode(
            bytes(
              abi.encodePacked(
                image,
                '"chainId":"',
                cParam.chainId,
                '",',
                '"vault":"',
                blParam.vault,
                '",',
                '"collateral":"',
                cParam.collateral,
                '",',
                '"debt":"',
                cParam.debt,
                '"',
                '}'
              )
            )
          )
        )
      );
  }

  function tokenURI(uint256 tokenId)
    external
    view
    override
    returns (string memory)
  {
    (
      NFTSVG.ChainParams memory cParams,
      NFTSVG.BlParams memory blParams,
      NFTSVG.HealthParams memory hParams,
      NFTSVG.CltParams memory cltParams
    ) = INFTConstructor(NFTConstructor).generateParams(tokenId);
    return formatTokenURI(tokenId, cParams, blParams, hParams, cltParams);
  }
}
