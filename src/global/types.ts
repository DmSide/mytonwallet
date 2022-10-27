import { typify } from '../lib/teact/teactn';
import {
  ApiHistoryList, ApiNft, ApiToken, ApiTransaction, ApiTransactionDraftError, ApiUpdate,
} from '../api/types';

export type ThemeKey = 'light' | 'dark';
export type NotificationType = {
  icon?: string;
  message: string;
};

export enum AuthState {
  none,
  creatingWallet,
  createPassword,
  createBackup,
  checkMnemonic,
  importWallet,
  importWalletCreatePassword,
  ready,
}

export enum TransferState {
  None,
  Initial,
  Confirm,
  Password,
  Complete,
}

export type UserToken = {
  amount: number;
  name: string;
  symbol: string;
  image?: string;
  slug: string;
  price: number;
  change24h: number;
  change7d: number;
  change30d: number;
  history24h?: ApiHistoryList;
  history7d?: ApiHistoryList;
  history30d?: ApiHistoryList;
};

export type GlobalState = {
  auth: {
    state: AuthState;
    isLoading?: boolean;
    mnemonic?: string[];
    mnemonicCheckIndexes?: number[];
    address?: string;
    error?: string;
  };

  currentTransfer: {
    state: TransferState;
    isLoading?: boolean;
    tokenSlug?: string;
    toAddress?: string;
    error?: string;
    amount?: number;
    fee?: string;
    comment?: string;
    promiseId?: string;
    txId?: string;
  };

  currentSignature?: {
    promiseId: string;
    dataHex: string;
    error?: string;
    isSigned?: boolean;
  };

  addresses?: {
    byAccountId: Record<string, string>;
  };

  balances?: {
    byAccountId: Record<string, {
      bySlug: Record<string, string>;
    }>;
  };

  tokenInfo?: {
    bySlug: Record<string, ApiToken>;
  };

  settings: {
    animationLevel: 0 | 1 | 2;
    areTinyTransfersHidden?: boolean;
    isTonProxyEnabled?: boolean;
    isTonMagicEnabled?: boolean;
  };

  transactions?: {
    isLoading?: boolean;
    byTxId: Record<string, ApiTransaction>;
    orderedTxIds?: string[];
  };

  currentLanguage?: {
    lang: string;
  };

  nfts?: {
    byAddress: Record<string, ApiNft>;
    orderedAddresses?: string[];
  };

  backupWallet: {
    isLoading?: boolean;
    mnemonic?: string[];
    error?: string;
  };

  isBackupRequired?: boolean;
  dialogs: string[];
  notifications: NotificationType[];
  currentTokenSlug?: string;
  currentTransactionId?: string;
  currentTokenPeriod?: '24h' | '7d' | '30d';

  savedAddresses?: Record<string, string>;
};

export interface ActionPayloads {
  // Initial
  init: never;
  initApi: never;
  apiUpdate: ApiUpdate;
  restartAuth: never;
  startCreatingWallet: never;
  afterCheckMnemonic: never;
  skipCheckMnemonic: never;
  restartCheckMnemonicIndexes: never;
  afterCreatePassword: { password: string; isImporting?: boolean };
  startImportingWallet: never;
  afterImportMnemonic: { mnemonic: string[] };

  selectToken: { slug?: string };
  startBackupWallet: { password: string };
  cleanBackupWalletError: never;
  closeBackupWallet: { isMnemonicChecked?: boolean };
  setTransferScreen: { state: TransferState };
  startTransfer: { tokenSlug: string; amount?: number; toAddress?: string; comment?: string };
  changeTransferToken: { tokenSlug: string };
  changeLanguage: { lang: string };
  fetchFee: { tokenSlug: string; amount: number; toAddress: string; comment?: string };
  submitTransferInitial: { tokenSlug: string; amount: number; toAddress: string; comment?: string };
  submitTransferConfirm: never;
  submitTransferPassword: { password: string };
  cleanTransferError: never;
  cancelTransfer: never;
  showDialog: { message: string };
  dismissDialog: never;
  showTxDraftError: { error?: ApiTransactionDraftError };
  showNotification: { message: string; icon?: string };
  dismissNotification: never;
  afterSignIn: never;
  signOut: never;
  fetchTransactions: { limit: number; offsetId?: string };
  fetchNfts: never;
  showTransactionInfo: { txId?: string };
  closeTransactionInfo: never;

  submitSignature: { password: string };
  cleanSignatureError: never;
  cancelSignature: never;

  toggleTinyTransfersHidden: { isEnabled: boolean };
  toggleTonProxy: { isEnabled: boolean };
  toggleTonMagic: { isEnabled: boolean };

  addSavedAddress: { address: string; name: string };
  removeFromSavedAddress: { address: string };

  setCurrentTokenPeriod: { period: GlobalState['currentTokenPeriod'] };
}

const typed = typify<GlobalState, ActionPayloads>();
export type GlobalActions = ReturnType<typeof typed.getActions>;
