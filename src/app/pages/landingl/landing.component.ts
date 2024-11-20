import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PredictResponse } from '../../core/models/predict.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponentLight implements OnInit, AfterViewInit {
  @ViewChild('graphContainer', { static: false }) graphContainer!: ElementRef;

  isTokenListModalOpen: boolean = false;
  tokenList: string[] = ["0x Protocol", "1MillionNFTs", "2crazyNFT", "ACA Token", "ACoconut", "ADAPad", "AIPAD", "ALL BEST ICO", "AME Chain", "APENFT", "APYSwap", "ASKO", "ASPO World", "ASTA", "ATOR Protocol", "AXEL", "AcknoLedger", "Acquire.Fi", "Across Protocol", "AdEx", "AdaSwap", "Aergo", "AhaToken", "Aimedis (new)", "AirDAO", "AirNFTs", "Akash Network", "Alanyaspor Fan Token", "Alfa Romeo Racing ORLEN Fan Token", "Alien Worlds", "Alitas", "AllianceBlock", "AllianceBlock Nexera", "Alpaca Finance", "Alpha Quark Token", "Alphr finance", "Alpine F1 Team Fan Token", "Aluna.Social", "Amazy", "Amp", "Anchor Protocol", "Ancient Raid", "Angola", "AnimalGo", "AntiMatter Token", "ApeCoin", "Apron Network", "ArGo", "Archimedes Finance", "Ardor", "Ares Protocol", "Argentine Football Association Fan Token", "Argon", "Ariva", "Arweave", "Aston Martin Cognizant Fan Token", "Aston Villa Fan Token", "Astrafer", "AstroSwap", "Atmos", "AtromG8", "Aura Finance", "Aurigami", "Aurox", "AurusX", "Auto", "Autobahn Network", "Avalanche", "Axie Infinity", "Axis DeFi", "BENQI", "BHO Network", "BSCStation", "Baanx", "BabySwap", "Badger DAO", "Balancer", "Battle Hero", "Battle World", "Beam", "Beer Money", "BendDAO", "Berry Data", "Beta Finance", "Beyond Protocol", "BiFi", "Big Data Protocol", "Billion Happiness", "Binamon", "BinaryX", "Binemon", "BioPassport Token", "Biswap", "BitCore", "BitShares", "Bitcoin", "Bitcoin 2", "Bitcoin Cash", "Bitcoin Diamond", "Bitcoin Gold", "Bitcoin Green", "Bitcoin Plus", "Bitcoin Standard Hashrate Token", "BitcoinZ", "Bitgesell", "Bitspawn", "Bitteam token", "Blocery", "Blockchain Cuties Universe Governance", "Blockchain Monster Hunt", "BlueMove", "Boba Network", "Bolivarcoin", "BonFi", "Bone ShibaSwap", "Boson Protocol", "Botto", "Bounce Token", "Braintrust", "Brazil National Football Team Fan Token", "Breezecoin", "Bridge Mutual", "Bridge Oracle", "Brokoli Network", "BullPerks", "BurgerCities", "Buying.com", "Bytecoin", "COGI", "CONTRACOIN", "COVER Protocol", "CUDOS", "Carbon Credit", "Carbon Protocol", "Cardano", "CareCoin", "Celer Network", "Cellframe", "Celo", "Celo Dollar", "Chain of Legends", "ChainGuardians", "ChainX", "Cheems Inu (new)", "Choise.com", "Chromia", "Citadel.one", "City Tycoon Games", "Clash of Lilliput", "Clearpool", "ClinTex CTi", "Coin98", "CoinAlpha", "Connectome", "ConstitutionDAO", "Construct", "Convex Finance", "Cook Finance", "Core", "Coreto", "CorionX", "Corite", "Cortex", "Covalent", "CoverCompared", "Crabada", "Cratos", "Creaticles", "Creo Engine", "Cronos", "CropperFinance", "Crowny", "Crust Shadow", "Crypto Sports Network", "CryptoBlades", "CryptoPlanes", "CryptoTycoon", "Cryptopolis", "Cult DAO", "CumRocket", "Curate", "Cyclone Protocol", "Cyclub", "DAFI Protocol", "DAPS Coin", "DDKoin", "DEAPcoin", "DEXTools", "DFI.Money", "DIA", "DIMO", "DOGGY", "DOSE", "DRIFE", "DSLA Protocol", "Dash", "Databroker", "Dawn Protocol", "DeFi Land", "DeFiChain", "DeFine", "DeHive", "DeXe", "Decentralized Social", "Decred", "DeepBrain Chain", "Deeper Network", "Defigram", "Defina Finance", "Defis", "Degenerator Meme", "Dego Finance", "DerivaDAO", "Dexlab", "Dexsport", "Dfyn Network", "Diamond", "Diamond Launch", "DigiByte", "Digital Reserve Currency", "Djed", "Dogechain", "Dogelon Mars", "Dotmoovs", "Dvision Network", "Dypius", "EPIK Prime", "ETHA Lend", "ETHAX", "ETHPad", "EVRYNET", "EarthFund", "EasyFi", "Efforce", "Electra Protocol", "Electroneum", "Eminer", "Epic Cash", "Equalizer", "Ergo", "Ethereum Classic", "Ethereum Name Service", "Etherisc DIP Token", "Ethernity", "Ethernity Chain", "EverRise", "Everton Fan Token", "Exeedme", "FC Porto Fan Token", "FIO Protocol", "FNCY", "FOTA - Fight Of The Ages", "Fabwelt", "Fantom", "Fenerbahçe Token", "Finxflo", "Firo", "Flamengo Fan Token", "Forest Knight", "Forj(Bondly)", "Formation Fi", "Forta", "Fortuna Sittard Fan Token", "Fractal", "Fruits", "Function X", "Furucombo", "GMCoin", "GPEX", "GTONCapital", "Gaj Finance", "Galaxy Blitz", "Galaxy Fight Club", "Galxe", "GameCredits", "Gamerse", "Gari Network", "Garlicoin", "Geeq", "Gem Exchange and Trading", "Gemie", "Genopets", "GensoKishi Metaverse", "Gleec Coin", "Glitch", "GlobalBoost-Y", "Gods Unchained", "Golden Goose", "Goldfinch", "Gomining", "Gourmet Galaxy", "Graviocoin", "Gravity Finance", "Grimm", "Groestlcoin", "Grove Coin", "GuildFi", "Gunstar Metaverse", "Göztepe S.K. Fan Token", "H2O DAO", "HAVAH", "HI", "HUNT", "Hacken Token", "HaloDAO", "Handshake", "HashBX", "Hawksight", "Hedera", "Hedget", "Hegic", "Helmet.insure", "Hermez Network", "Heroes Chained", "HeroesTD", "Hifi Finance (Old)", "HoDooi.com", "Hoge Finance", "HollyGold", "Hord", "Horizen", "Hot Cross", "Hourglass", "HyperCash", "HyperChainX", "Hyve", "ILCOIN", "IMPT", "IQ", "Idavoll DAO", "Ideaology", "Idle", "Ignis", "Image Generation AI", "Impossible Finance", "Impossible Finance Launchpad", "Innova", "InsurAce", "Integral", "Internet of Energy Network", "Internxt", "Isiklar Coin", "JUST", "JasmyCoin", "Juggernaut", "JulSwap", "K21", "KILT Protocol", "KIRA", "Kaby Arena", "Kalao", "KamPay", "KardiaChain", "Kaspa", "Kava Lend", "Kava Swap", "Keep Network", "Kin", "King DAG", "KingdomStarter", "Klaydice", "Knight War - The Holy Trio", "Knit Finance", "Kommunitas", "Konomi Network", "Kripto koin", "Kromatika", "KuCoin Token", "KubeCoin", "Kunci Coin", "LATOKEN", "LBRY Credits", "LOCGame", "Lambda", "Landbox", "Landshare", "Lattice Token", "Launchblock.com", "Leeds United Fan Token", "Legia Warsaw Fan Token", "LeverFi", "Lido DAO", "Life Crypto", "Lightning", "Linear Finance", "Linked Finance World", "Liquity", "Litecoin", "Litecoin Cash", "Litentry", "Lithosphere", "Lokr", "LooksRare", "Loser Coin", "Lossless", "Lovely Inu Finance", "Lucretius", "Luna Rush", "Lympo Market Token", "MAPS", "MATH", "MAX Exchange Token", "MEVerse", "MIBR Fan Token", "MMOCoin", "MOBOX", "MUNT", "MUX Protocol", "Manchester City Fan Token", "Mancium", "Maple", "Marinade Staked SOL", "Maro", "Mask Network", "Massnet", "Matrix AI Network", "Mesefa", "MetaBeat", "MetagamZ", "Metahero", "Metal DAO", "MetamonkeyAi", "Metars Genesis", "Metaverse.Network Pioneer", "MetaverseX", "MetisDAO", "Metrix Coin", "MimbleWimbleCoin", "Mines of Dalarnia", "Mint Club", "Mint Marble", "Mist", "MixMarvel", "Mochi Market", "Modefi", "Mogul Productions", "Monavale", "MovieBloc", "Mrweb Finance", "MultiversX", "MurAll", "My Master War", "MyNeighborAlice", "Myriad", "Mytheria", "NBX", "NFT Worlds", "NFTY Token", "NFTrade", "NKN", "NULS", "Nabox", "Nafter", "Nano", "Nash", "Neighbourhoods", "Neo", "NeoNomad", "NerveNetwork", "Neutra Finance", "Neutrino Token", "NewYork Exchange", "Newscrypto", "Nexa", "NextDAO", "Niftify", "Nimiq", "Nine Chronicles", "Ninneko", "Nord Finance", "Nuco.cloud", "Numbers Protocol", "Numeraire", "O3 Swap", "ODIN PROTOCOL", "OIN Finance", "OMG Network", "ONBUFF", "ONSTON", "ORAO Network", "Oasis Network", "Oasys", "Ocean Protocol", "Oddz", "Offshift (old)", "Olyverse", "Omax Coin", "OnGO", "OneArt", "Only1", "Onooks", "Onyxcoin", "Ooki Protocol", "OpenLeverage", "OpenOcean", "OpenSwap", "Oraichain", "Orbcity", "Orbit Chain", "Origin Dollar Governance", "Orion Money", "Osmosis", "Oxbull.tech", "Oxygen", "PAC Protocol", "PAID Network", "PARSIQ", "PERI Finance", "PKT", "POLKARARE", "PREMA", "PRivaCY Coin", "Pancake Bunny", "Pangolin", "ParaSwap", "Pascal", "Pawthereum", "Pawtocol", "Paybswap", "Peanut", "Pendle", "Peruvian National Football Team Fan Token", "Petals", "Phoenix Token", "PhoenixDAO", "Phoneum", "Pillar", "Pip", "PlanetWatch", "Plant Vs Undead", "Playcent", "Playermon", "PlotX", "Pluton", "PolkaWar", "Polkadex", "Polkamarkets", "Polker", "Polygon", "Polytrade", "Populous", "Position Exchange", "Presearch", "Prism", "PrivaCoin", "Project TXA", "Props Token", "Prosper", "PulsePad", "Pundi X (New)", "Push Protocol", "Qredo", "Qrkita Token", "Qtum", "Quantum Resistant Ledger", "QuarkChain", "Quickswap [New]", "Quiztok", "RACA", "RAMP", "RFOX", "RIZON", "RMRK", "RSS3", "Radiant", "Rage Fan", "Rainicorn", "Rakon", "Rangers Protocol", "Ravencoin", "Ravencoin Classic", "Raydium", "Raze Network", "Razor Network", "RealFevr", "Realio Network", "Red Kite", "Reflexer Ungovernance Token", "RocketX exchange", "Rook", "Router Protocol", "Royale Finance", "Rune Shards", "S.C. Corinthians Fan Token", "S.S. Lazio Fan Token", "SENSO", "SHIBAVAX", "SHILL Token", "SHOPX", "SKALE", "SORA Validator Token", "SPORT", "STAKE", "STEPN", "SafeCoin", "SafePal", "Safex Cash", "Saito", "Sakura", "Samsunspor Fan Token", "Santos FC Fan Token", "Sator", "Seascape Crowns", "Seedify.fund", "Seigniorage Shares", "SelfKey", "Serum", "Shattered Legion", "Shiba Predator", "Shirtum", "ShoeFy", "Shopping.io", "Shyft Network", "Signata", "SingularityDAO", "SingularityNET", "Skeb Coin", "Skyrim Finance", "SmartCash", "SmileyCoin", "Smoothy", "SnowSwap", "SolChicks Token", "SolanaSail Governance Token", "Solanium", "Soldex", "Solend", "Sologenic", "Solrise Finance", "Sonar", "Sovryn", "SpaceN", "SparkPoint Fuel", "Spartan Protocol", "Spheroid Universe", "SpiritSwap", "Splintershards", "SpookySwap", "Spores Network", "Sportcash One", "SquidGrow", "StaFi", "Stacks", "Stader", "Stake DAO", "Star Atlas", "Star Atlas DAO", "Stargate Finance", "Starlink", "Step Hero", "StormX", "StreamCoin", "Strike", "Strips Finance", "Strong", "SunContract", "Super Zero Protocol", "SuperRare", "SuperVerse", "SuperWalk", "Swash", "Swerve", "Swingby", "Sylo", "Symbiosis", "Symbol", "Synthetify", "Syntropy", "Sypool", "TABOO TOKEN", "TE-FOOD", "TEMCO", "THENA", "TRAVA.FINANCE", "Tachyon Protocol", "Tamadoge", "Tarot", "Team Vitality Fan Token", "The Crypto Prophecies", "The HUSL", "The Sandbox", "TheForce Trade", "Theta Network", "Thetan Arena", "Thorstarter", "ThreeFold", "Tokenlon Network Token", "Toko Token", "TopGoal", "Torum", "Tranche Finance", "Tranchess", "TrezarCoin", "Triall", "Tribe", "TrueFi", "Tulip Protocol", "Tycoon", "UBIX.Network", "UFC Fan Token", "UFO Gaming", "UREEQA", "Unbound", "UniLayer", "UniLend", "Unifi Protocol DAO", "Universidad de Chile Fan Token", "VEKTOR", "VIDT DAO", "VIMworld", "VVS Finance", "Vabble", "Validity", "Valobit", "VelasPad", "Venus", "Verso", "Vertcoin", "Vesper", "Vexanium", "Victoria VR", "Vidya", "Virtua", "Virtue Poker", "VisionGame", "Vita Inu", "Voxies", "Voyager Token", "Vulcan Forged PYR", "WHALE", "WINkLink", "WOOF", "WagyuSwap", "Waltonchain", "Waterfall DeFi", "Whiteheart", "Wicrypt", "Wilder World", "Wing Finance", "Wolf Safe Poor People (Polygon)", "Wombat Web 3 Gaming Platform", "World Mobile Token", "Wownero", "X World Games", "X-CASH", "XCarnival", "XDEFI Wallet", "XMON", "XPLA", "XRP", "XY Finance", "XeniosCoin", "YFDAI.FINANCE", "YUSRA", "Yellow Road", "Yield App", "Yield Protocol", "YooShi", "ZKSpace", "Zcash", "Zebec", "Zelwin", "Zenfuse", "Zigcoin", "Zilliqa", "Zoracles", "Zuki Moba", "Zyberswap", "aelf", "aiRight", "dHedge DAO", "dYdX", "disBalancer", "eCash", "extraDNA", "inSure DeFi", "renBTC", "saffron.finance", "unFederalReserve", "x42 Protocol", "xHashtag", "yieldwatch", "Æternity"]
  ;  
  coinName: string = '';
  coinSymbol: string = '';
  graphHtml: string = '';
  comparisonResults: any = null;
  private Plotly: any;
  showResults: boolean = false;
  showAllResults: boolean = false;

  constructor(
    private http: HttpClient,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  openTokenListModal() {
    this.isTokenListModalOpen = true;
    this.cdr.detectChanges();
  }

  closeTokenListModal() {
    this.isTokenListModalOpen = false;
    this.cdr.detectChanges();
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadPlotly();
    }
    this.route.queryParams.subscribe(params => {
      if (params['coinName'] && params['coinSymbol']) {
        this.coinName = params['coinName'];
        this.coinSymbol = params['coinSymbol'];
        this.onSubmit();
      }
    });
  }

  ngAfterViewInit() {
    console.log('AfterViewInit - Graph container:', this.graphContainer);
  }

  private async loadPlotly() {
    try {
      const plotly = await import('plotly.js-dist-min');
      this.Plotly = plotly.default;
      console.log('Plotly loaded successfully');
    } catch (error) {
      console.error('Error loading Plotly:', error);
    }
  }

  onSubmit() {
    if (this.coinName) {
      console.log('Formulario enviado con:', this.coinName);
  
      this.http.post<PredictResponse>('https://3952-38-25-122-44.ngrok-free.app/predict-l', {
        name: this.coinName,
      }).subscribe(
        response => {
          console.log('Respuesta del servidor:', response);
          
          const graphData = response.graph_data;
          const graphLayout = response.graph_layout;
  
          this.comparisonResults = response.comparison_results;
          this.showResults = true;
  
          if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => {
              this.initPlotly(graphData, graphLayout);
            }, 100);
          }
        },
        error => {
          console.error('Error en la solicitud:', error);
        }
      );
    }
  }
  
  private initPlotly(graphData: any[], graphLayout: any) {
    console.log('Initializing Plotly...');
    console.log('Graph data:', graphData);
    console.log('Graph layout:', graphLayout);

    if (!this.graphContainer || !this.Plotly) {
      console.warn('Graph container or Plotly is not available');
      return;
    }

    this.graphContainer.nativeElement.innerHTML = '';

    const screenWidth = window.innerWidth;
    const graphWidth = Math.floor(screenWidth * 0.8); // 80% of screen width
    const graphHeight = Math.floor(graphWidth * 0.4425); // 16:9 aspect ratio

    const updatedLayout = {
      ...graphLayout,
      autosize: false,
      width: graphWidth,
      height: graphHeight,
      margin: { l: 50, r: 50, b: 100, t: 100, pad: 4 }
    };

    this.Plotly.newPlot(this.graphContainer.nativeElement, graphData, updatedLayout)
      .then(() => {
        console.log('Plotly graph rendered successfully.');
      })
      .catch((error: any) => {
        console.error('Error rendering Plotly graph:', error);
      });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  formatNumber(num: number | string): string {
    if (num === '-') return '-';
    return typeof num === 'number' ? num.toLocaleString('es-ES', { maximumFractionDigits: 2 }) : num;
  }

  formatPercentage(num: number | null): string {
    if (num === null) return '';
    return (num*1).toFixed(2) + '%';
  }

  toggleShowAllResults() {
    this.showAllResults = !this.showAllResults;
  }

  getDisplayedResults() {
    const results = this.showAllResults ? this.comparisonResults : this.comparisonResults.slice(0, 6);
    return results.map((result: any) => ({
      ...result,
      isHighlighted: result.y_actual === '-' || result.y_pred === '-'
    }));
  }
}