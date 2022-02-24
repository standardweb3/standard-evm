// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "base64-sol/base64.sol";
import "./libraries/NFTSVG.sol";
import "./interfaces/INFTSVG.sol";
import "./interfaces/INFTConstructor.sol";

contract NFTDescriptor is INFTSVG {
  address NFTConstructor;

  constructor(address constructor_) {
    NFTConstructor = constructor_;
  }

  // You could also just upload the raw SVG and have solildity convert it!
  function svgToImageURI(
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
            NFTSVG.generateSVG(cParams, blParams, hParams, cltParams)
          )
        )
      )
    );
    imageURI = string(
      abi.encodePacked("data:image/svg+xml;base64,", svgBase64Encoded)
    );
  }

  // You could also just upload the raw SVG and have solildity convert it!
  function svgToImageURITest(uint256 tokenId_)
    public
    view
    returns (string memory imageURI)
  {
    (
      NFTSVG.ChainParams memory cParams,
      NFTSVG.BlParams memory blParams,
      NFTSVG.HealthParams memory hParams,
      NFTSVG.CltParams memory cltParams
    ) = INFTConstructor(NFTConstructor).generateParams(tokenId_);
    imageURI = svgToImageURI(cParams, blParams, hParams, cltParams);
  }

  function formatTokenURI(
    string memory imageURI,
    NFTSVG.ChainParams memory cParam,
    NFTSVG.BlParams memory blParam
  ) internal pure returns (string memory) {
    bytes memory image = abi.encodePacked(
      '{"name":"',
      'VaultOne",',
      '"description":"VaultOne represents the ownership of',
      " one's financial rights written in an immutable smart contract. ",
      "Only the holder can manage and interact with the funds connected to its immutable smart contract",
      '",',
      '"image":"',
      imageURI,
      '",'
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
                "}"
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
    string memory imageURI = svgToImageURI(
      cParams,
      blParams,
      hParams,
      cltParams
    );
    return formatTokenURI(imageURI, cParams, blParams);
  }
}
