// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "base64-sol/base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract PureSVG {
  using Strings for uint256;

  function generateSVGDefs() private pure returns (string memory svg) {
    string memory url = "https://i.imgur.com/YESHC62.png";
    svg = string(
      abi.encodePacked(
        '<svg width="400" height="250" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg"',
        ' xmlns:xlink="http://www.w3.org/1999/xlink">',
        '<rect width="400" height="250" fill="url(#pattern0)" />',
        "<defs>",
        '<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">',
        '<use xlink:href="#image0_18_24" transform="scale(0.0025 0.004)" />',
        "</pattern>",
        '<image id="image0_18_24" width="400" height="250" xlink:href="',
        "https://raw.githubusercontent.com/digitalnativeinc/nft-arts/main/V1/backgrounds/",
        '1088',
        ".png",
        '"',
        " />",
        "</defs>",
        '<rect x="10" y="12" width="380" height="226" rx="20" ry="20" fill="rgba(0,0,0,0)" stroke="rgba(255,255,255,0.8)" />'
      )
    );
  }

  function generateBalances() private pure returns (string memory svg) {
    svg = string(
      abi.encodePacked(
        '<text y="60" x="32" fill="white"',
        ' font-family="Poppins" font-weight="400" font-size="24px">WETH Vault #2</text>',
        '<text y="85px" x="32px" fill="white" font-family="Poppins" font-weight="350" font-size="14px">Collateral: ',
        "1000",
        " ",
        "WETH",
        "</text>"
        '<text y="110px" x="32px" fill="white" font-family="Poppins" font-weight="350" font-size="14px">IOU: ',
        "1500",
        " ",
        "USM"
        "</text>"
      )
    );
  }

  function generateHealth() internal pure returns (string memory svg) {
    string memory heart = unicode"❤️";
    svg = string(
      abi.encodePacked(
        '<text y="135px" x="32px" fill="white" font-family="Poppins" font-weight="350" font-size="14px">Health: ',
        "80",
        "% ",
        heart,
        "</text>"
      )
    );
  }

  function generateBitmap() internal pure returns (string memory svg) {
    svg = string(
      abi.encodePacked(
        "<g>",
        '<svg class="healthbar" xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 38 9" shape-rendering="crispEdges"',
        ' x="-113px" y="138px" width="400px" height="30px">',
        '<path stroke="#222034"',
        ' d="M2 2h1M3 2h32M3  3h1M2 3h1M35 3h1M3 4h1M2 4h1M35 4h1M3  5h1M2 5h1M35 5h1M3 6h32M3" />',
        '<path stroke="#323c39" d="M3 3h32" />',
        '<path stroke="#494d4c" d="M3 4h32M3 5h32" />',
        "<g>"
      )
    );
  }

  function generateHealthBar() internal pure returns (string memory svg) {
    svg = string(
      abi.encodePacked(
        '<svg x="3" y="2.5" width="32" height="10">',
        '<rect fill="',
        "#57e705",
        '" height="3">',
        ' <animate attributeName="width" from="0" to="20" dur="0.5s" fill="freeze" />',
        "</rect>",
        "</svg>",
        "</g>",
        "</svg>",
        "</g>"
      )
    );
  }

  function generateCltParams() internal pure returns (string memory svg) {
    svg = string(
      abi.encodePacked(
        '<g style="transform:translate(30px, 180px)">',
        '<rect width="120px" height="12px" rx="3px" ry="3px" fill="rgba(0,0,0,0.6)" /><text x="6px" y="9px"'
        ' font-family="Poppins" font-size="8px" fill="white">',
        '<tspan fill="rgba(255,255,255,0.6)">Min. Collateral Ratio: </tspan>',
        "150",
        "% </text>"
        "</g>",
        '<g style="transform:translate(30px, 195px)">',
        '<rect width="110px" height="12px" rx="3px" ry="3px" fill="rgba(0,0,0,0.6)" /><text x="6px" y="9px"'
        ' font-family="Poppins" font-size="8px" fill="white">',
        '<tspan fill="rgba(255,255,255,0.6)">Liq. Penalty Ratio: </tspan>',
        "150",
        "% </text>"
        "</g>",
        '<g style="transform:translate(30px, 210px)">',
        '<rect width="80px" height="12px" rx="3px" ry="3px" fill="rgba(0,0,0,0.6)" /><text x="6px" y="9px"'
        ' font-family="Poppins" font-size="8px" fill="white">',
        '<tspan fill="rgba(255,255,255,0.6)">Stability Fee: </tspan>',
        "150",
        "% </text>"
        "</g>"
      )
    );
  }

  function generateTextPath() internal pure returns (string memory svg) {
    svg = string(
      // text path has to be one liner, concatenating separate texts causes encoding error
      abi.encodePacked(
        '<path id="text-path-a" transform="translate(1,1)" d="M369.133 1.20364L28.9171 1.44856C13.4688 1.45969 0.948236 13.9804 0.937268 29.4287L0.80321 218.243C0.792219 233.723 13.3437 246.274 28.8233 246.263L369.04 246.018C384.488 246.007 397.008 233.486 397.019 218.038L397.153 29.2235C397.164 13.7439 384.613 1.1925 369.133 1.20364Z" fill="none" stroke="none" />'
      )
    );
  }

  function generateText1(string memory a, string memory path)
    internal
    pure
    returns (string memory svg)
  {
    svg = string(
      abi.encodePacked(
        '<text text-rendering="optimizeSpeed">',
        '<textPath startOffset="-100%" fill="white" font-family="Poppins" font-size="10px" xlink:href="#text-path-',
        path,
        '">',
        a,
        '<animate additive="sum" attributeName="startOffset" from="0%" to="100%" begin="0s" dur="30s" repeatCount="indefinite" />',
        '</textPath> <textPath startOffset="0%" fill="white" font-family="Poppins" font-size="10px" xlink:href="#text-path-',
        path,
        '">',
        a,
        '<animate additive="sum" attributeName="startOffset" from="0%" to="100%" begin="0s" dur="30s" repeatCount="indefinite" /> </textPath>'
      )
    );
  }

  function generateText2(string memory b, string memory path)
    internal
    pure
    returns (string memory svg)
  {
    svg = string(
      abi.encodePacked(
        '<textPath startOffset="50%" fill="white" font-family="Poppins" font-size="10px" xlink:href="#text-path-',
        path,
        '">',
        b,
        '<animate additive="sum" attributeName="startOffset" from="0%" to="100%" begin="0s" dur="30s"',
        ' repeatCount="indefinite" /></textPath><textPath startOffset="-50%" fill="white" font-family="Poppins" font-size="10px" xlink:href="#text-path-',
        path,
        '">',
        b,
        '<animate additive="sum" attributeName="startOffset" from="0%" to="100%" begin="0s" dur="30s" repeatCount="indefinite" /></textPath></text>'
      )
    );
  }

  function generateNetwork() internal pure returns (string memory svg) {
    svg = string(
      abi.encodePacked(
        '<image  x="285" y="50" width="60" height="60" xlink:href="'
        "https://raw.githubusercontent.com/digitalnativeinc/nft-arts/main/V1/networks/",
        '1088',
        ".png",
        '" />'      
        )
    );
  }

  function generateNetTextPath() internal pure returns (string memory svg) {
    svg = string(
      // text path has to be one liner, concatenating separate texts causes encoding error
      abi.encodePacked(
        '<path id="text-path-b" transform="translate(269,35)" d="M1 46C1 70.8528 21.1472 91 46 91C70.8528 91 91 70.8528 91 46C91 21.1472 70.8528 1 46 1C21.1472 1 1 21.1472 1 46Z" stroke="none"/>'
      )
    );
  }

  function generateTokenLogos() internal pure returns (string memory svg) {
    svg = string(
      abi.encodePacked(
        '<g style="transform:translate(265px, 180px)">'
        '<rect width="48px" height="48px" rx="10px" ry="10px" fill="none" stroke="rgba(255,255,255,0.6)" />'
        '<image x="4" y="4" width="40" height="40" xlink:href="',
        "https://raw.githubusercontent.com/digitalnativeinc/nft-arts/main/V1/tokens/",
        '4',
        '/'
        '0xc778417E063141139Fce010982780140Aa0cD5Ab',
        ".png",
        '" />'
        "</g>"
        '<g style="transform:translate(325px, 180px)">'
        '<rect width="48px" height="48px" rx="10px" ry="10px" fill="none" stroke="rgba(255,255,255,0.6)" />'
        '<image x="4" y="4" width="40" height="40" xlink:href="',
        "https://raw.githubusercontent.com/digitalnativeinc/nft-arts/main/V1/tokens/",
        '4',
        '/'
        '0x6388e0cC745b3c5ED23c6D569A01A4D27eDa3E14',
        ".png",
        '" />'
        "</g>"
      )
    );
  }

  function generateSVG() internal pure returns (string memory svg) {
    string memory a = string(
      abi.encodePacked(
        "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
        unicode" • ",
        "Vault"
      )
    );
    string memory b = string(
      abi.encodePacked(unicode" • ", "Ethereum", unicode" • ")
    );
    string memory first = string(
      abi.encodePacked(
        generateSVGDefs(),
        generateBalances(),
        generateHealth(),
        generateBitmap(),
        generateHealthBar(),
        generateCltParams(),
        generateTextPath(),
        generateText1(a, "a"),
        generateText2(a, "a")
      )
    );
    svg = string(
      abi.encodePacked(
        first,
        generateNetwork(),
        generateNetTextPath(),
        generateText1(b, "b"),
        generateText2(b, "b"),
        generateTokenLogos(),
        "</svg>"
      )
    );
  }

  // You could also just upload the raw SVG and have solildity convert it!
  function svgToImageURI() public pure returns (string memory) {
    // example:
    // <svg width='500' height='500' viewBox='0 0 285 350' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill='black' d='M150,0,L75,200,L225,200,Z'></path></svg>
    // data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNTAwJyBoZWlnaHQ9JzUwMCcgdmlld0JveD0nMCAwIDI4NSAzNTAnIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZmlsbD0nYmxhY2snIGQ9J00xNTAsMCxMNzUsMjAwLEwyMjUsMjAwLFonPjwvcGF0aD48L3N2Zz4=
    string memory baseURL = "data:image/svg+xml;base64,";
    string memory svgBase64Encoded = Base64.encode(
      bytes(string(abi.encodePacked(generateSVG())))
    );
    return string(abi.encodePacked(baseURL, svgBase64Encoded));
  }

  function formatTokenURI(string memory imageURI)
    public
    pure
    returns (string memory)
  {
    return
      string(
        abi.encodePacked(
          "data:application/json;base64,",
          Base64.encode(
            bytes(
              abi.encodePacked(
                '{"name":"',
                "VaultOne", // You can add whatever name here
                '", "description":"An NFT based on SVG!", "attributes":"", "image":"',
                imageURI,
                '"}'
              )
            )
          )
        )
      );
  }

  // remove later:
  function bytes32ToString(bytes32 _bytes32)
    public
    pure
    returns (string memory)
  {
    uint8 i = 0;
    while (i < 32 && _bytes32[i] != 0) {
      i++;
    }
    bytes memory bytesArray = new bytes(i);
    for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
      bytesArray[i] = _bytes32[i];
    }
    return string(bytesArray);
  }
}
