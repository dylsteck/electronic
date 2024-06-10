export interface SIWNResponseData {
    fid: string;
    is_authenticated: boolean;
    signer_uuid: string;
    user: {
        object: string;
        fid: number;
        custody_address: string;
        username: string;
        display_name: string;
        pfp_url: string;
        profile: {
            bio: {
                text: string;
            };
        };
        follower_count: number;
        following_count: number;
        verifications: string[];
        verified_addresses: {
            eth_addresses: string[];
            sol_addresses: string[];
        };
        active_status: string;
        power_badge: boolean;
    };
}

export interface SIWNWindow extends Window {
    onSignInSuccess?: (data: SIWNResponseData) => void;
}

export type NeynarV1User = {
  fid: number;
  custodyAddress: string;
  username: string;
  displayName: string;
  pfp: {
      url: string;
  };
  profile: {
      bio: {
          text: string;
          mentionedProfiles: any[];
      };
  };
  followerCount: number;
  followingCount: number;
  verifications: string[];
  activeStatus: string;
}