// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

library NFTSVG {
  struct ChainParams {
    string chainId;
    string chainName;
    string collateral;
    string debt;
  }

  struct BlParams {
    string vault;
    string cBlStr;
    string dBlStr;
    string symbol;
  }

  struct CltParams {
    string MCR;
    string LFR;
    string SFR;
  }

  struct HealthParams {
    string HP;
    string HPBarColor;
    string HPStatus;
    string HPGauge;
  }

  function generateSVGDefs(ChainParams memory params)
    internal
    pure
    returns (string memory svg)
  {
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
        params.chainId,
        ".png",
        '"',
        " />",
        "</defs>",
        '<rect x="10" y="12" width="380" height="226" rx="20" ry="20" fill="rgba(0,0,0,0)" stroke="rgba(255,255,255,0.8)" />'
      )
    );
  }

  function generateBalances(BlParams memory params)
    internal
    pure
    returns (string memory svg)
  {
    svg = string(
      abi.encodePacked(
        '<text y="60" x="32" fill="white"',
        ' font-family="Poppins" font-weight="400" font-size="24px">WETH Vault #2</text>',
        '<text y="85px" x="32px" fill="white" font-family="Poppins" font-weight="350" font-size="14px">Collateral: ',
        params.cBlStr,
        " ",
        params.symbol,
        "</text>"
        '<text y="110px" x="32px" fill="white" font-family="Poppins" font-weight="350" font-size="14px">IOU: ',
        params.dBlStr,
        " ",
        "USM"
        "</text>"
      )
    );
  }

  function generateHealth(HealthParams memory params)
    internal
    pure
    returns (string memory svg)
  {
    svg = string(
      abi.encodePacked(
        '<text y="135px" x="32px" fill="white" font-family="Poppins" font-weight="350" font-size="14px">Health: ',
        params.HP,
        "% ",
        params.HPStatus,
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

  function generateHealthBar(HealthParams memory params)
    internal
    pure
    returns (string memory svg)
  {
    svg = string(
      abi.encodePacked(
        '<svg x="3" y="2.5" width="32" height="10">',
        '<rect fill="',
        params.HPBarColor,
        '" height="3">',
        ' <animate attributeName="width" from="0" to="',
        params.HPGauge,
        '" dur="0.5s" fill="freeze" />',
        "</rect>",
        "</svg>",
        "</g>",
        "</svg>",
        "</g>"
      )
    );
  }

  function generateCltParam(
    string memory y,
    string memory width,
    string memory desc,
    string memory percent
  ) internal pure returns (string memory svg) {
    svg = string(
      abi.encodePacked(
        '<g style="transform:translate(30px, ',
        y,
        ')">',
        '<rect width="',
        width,
        '" height="12px" rx="3px" ry="3px" fill="rgba(0,0,0,0.6)" /><text x="6px" y="9px"',
        ' font-family="Poppins" font-size="8px" fill="white">',
        '<tspan fill="rgba(255,255,255,0.6)">',
        desc,
        ": </tspan>",
        percent,
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

  function generateNetwork(ChainParams memory cParams) internal pure returns (string memory svg) {
    svg = string(
      abi.encodePacked(
        '<image  x="285" y="50" width="60" height="60" xlink:href="'
        "https://raw.githubusercontent.com/digitalnativeinc/nft-arts/main/V1/networks/",
        cParams.chainId,
        ".png",
        '" />',
        generateTokenLogos(cParams)
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

  function generateTokenLogos(ChainParams memory cParam) internal pure returns (string memory svg) {
    svg = string(
      abi.encodePacked(
        '<g style="transform:translate(265px, 180px)">'
        '<rect width="48px" height="48px" rx="10px" ry="10px" fill="none" stroke="rgba(255,255,255,0.6)" />'
        '<image x="4" y="4" width="40" height="40" xlink:href="',
        "https://raw.githubusercontent.com/digitalnativeinc/nft-arts/main/V1/tokens/",
        cParam.chainId,
        '/',
        cParam.collateral,
        ".png",
        '" />'
        "</g>"
        '<g style="transform:translate(325px, 180px)">'
        '<rect width="48px" height="48px" rx="10px" ry="10px" fill="none" stroke="rgba(255,255,255,0.6)" />'
        '<image x="4" y="4" width="40" height="40" xlink:href="',
        "https://raw.githubusercontent.com/digitalnativeinc/nft-arts/main/V1/tokens/",
        cParam.chainId,
        '/',
        cParam.debt,
        ".png",
        '" />'
        "</g>"
      )
    );
  }

  function generateSVG(
    ChainParams memory cParams,
    BlParams memory blParams,
    HealthParams memory hParams,
    CltParams memory cltParams
  ) internal pure returns (string memory svg) {
    string memory a = string(
      abi.encodePacked(
        blParams.vault,
        unicode" • ",
        "Vault"
      )
    );
    string memory b = string(
      abi.encodePacked(unicode" • ", cParams.chainName, unicode" • ")
    );
    string memory first = string(
      abi.encodePacked(
        generateSVGDefs(cParams),
        generateBalances(blParams),
        generateHealth(hParams),
        generateBitmap(),
        generateHealthBar(hParams),
        generateCltParam("180px", "130px", "Min. Collateral Ratio", cltParams.MCR),
        generateCltParam("195px", "110px", "Liquidation Fee", cltParams.LFR),
        generateCltParam("210px", "90px", "Stability Fee", cltParams.SFR)
      )
    );
    svg = string(
      abi.encodePacked(
        first,
        generateTextPath(),
        generateText1(a, "a"),
        generateText2(a, "a"),
        generateNetwork(cParams),
        generateNetTextPath(),
        generateText1(b, "b"),
        generateText2(b, "b"),
        "</svg>"
      )
    );
  }
}
