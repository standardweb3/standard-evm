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
    string lastUpdated;
    string name;
  }

  struct CltParams {
    string MCR;
    string LFR;
    string SFR;
  }

  struct HealthParams {
    uint256 rawHP;
    string HP;
    string HPBarColor1;
    string HPBarColor2;
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
        '<rect x="10" y="12" width="380" height="226" rx="20" ry="20" fill="rgba(0,0,0,0)" stroke="rgba(255,255,255,0.8)" />'
      )
    );
  }

  function generateBalances(BlParams memory params, string memory id)
    internal
    pure
    returns (string memory svg)
  {
    svg = string(
      abi.encodePacked(
        '<text y="60" x="32" fill="white"',
        ' font-family="Poppins" font-weight="400" font-size="24px">WETH Vault #',
        id,
        '</text>',
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

  function generateStop(string memory color1, string memory color2)
    internal
    pure
    returns (string memory svg)
  {
    svg = string(
      abi.encodePacked(
        '<stop offset="5.99%">',
        '<animate attributeName="stop-color" values="',
        color1,
        "; ",
        color2,
        "; ",
        color1,
        '" dur="3s" repeatCount="indefinite"></animate>',
        "</stop>"
      )
    );
  }

  function generateLinearGradient(HealthParams memory params)
    internal
    pure
    returns (string memory svg)
  {
    svg = string(
      abi.encodePacked(
        '<linearGradient id="myGradient" gradientTransform="rotate(270.47)" >',
        generateStop(params.HPBarColor1, params.HPBarColor2),
        generateStop(params.HPBarColor2, params.HPBarColor1),
        "</linearGradient>"
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
        generateLinearGradient(params),
        '<svg x="3" y="2.5" width="32" height="10">',
        '<rect fill="',
        "url(",
        "'#myGradient'",
        ')"',
        ' height="3">',
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

  function generateNetwork(ChainParams memory cParams)
    internal
    pure
    returns (string memory svg)
  {
    svg = string(
      abi.encodePacked(
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

  function generateTokenLogos(ChainParams memory cParam)
    internal
    pure
    returns (string memory svg)
  {
    svg = string(
      abi.encodePacked(
        '<g style="transform:translate(265px, 180px)">'
        '<rect width="48px" height="48px" rx="10px" ry="10px" fill="none" stroke="rgba(255,255,255,0.6)" />'
        "</g>"
        '<g style="transform:translate(325px, 180px)">'
        '<rect width="48px" height="48px" rx="10px" ry="10px" fill="none" stroke="rgba(255,255,255,0.6)" />'
        "</g>"
      )
    );
  }

  function generateSVGWithoutImages(
    string memory tokenId,
    ChainParams memory cParams,
    BlParams memory blParams,
    HealthParams memory hParams,
    CltParams memory cltParams
  ) internal pure returns (string memory svg) {
    string memory a = string(
      abi.encodePacked(blParams.vault, unicode" • ", "Vault")
    );
    string memory b = string(
      abi.encodePacked(unicode" • ", cParams.chainName, unicode" • ")
    );
    string memory first = string(
      abi.encodePacked(
        generateSVGDefs(cParams),
        generateBalances(blParams, tokenId),
        generateHealth(hParams),
        generateBitmap(),
        generateHealthBar(hParams)
      )
    );
    string memory second = string(
      abi.encodePacked(
        first,
        generateCltParam(
          "180px",
          "130px",
          "Min. Collateral Ratio",
          cltParams.MCR
        ),
        generateCltParam("195px", "110px", "Liquidation Fee", cltParams.LFR),
        generateCltParam("210px", "90px", "Stability Fee", cltParams.SFR),
        generateTextPath()
      )
    );
    svg = string(
      abi.encodePacked(
        second,
        generateText1(a, "a"),
        generateText2(a, "a"),
        generateNetwork(cParams),
        generateNetTextPath(),
        generateText1(b, "b"),
        generateText2(b, "b")
      )
    );
  }
}
