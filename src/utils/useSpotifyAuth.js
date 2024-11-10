
const clientID = "831ce5e002bb40d580592f7f2281d266";
const clientSecret = "dadaf4a005444351a0ba07c0c8baff33";
const responseType = "code";
const  redirectURI = "http://localhost:3000/callback";
const scope = "playlist-modify-private playlist-modify-public";
export let code = "";


// Function to generate a random string for the state parameter
const generateRandomString = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// Function to get the Spotify login URL
export const getSpotifyLoginUrl = () => {
  const state = generateRandomString(16);

  const params = new URLSearchParams({
    response_type: responseType,
    client_id: clientID,
    scope: scope,
    redirect_uri: redirectURI,
    state: state,
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const spotifyCallback = (locHook) => {
  const location = locHook;

    const params = new URLSearchParams(location.search);
    code = params.get('code');
    console.log(`the code is${code}`);
    localStorage.setItem('access_code', code);
    return code;

  }                                      

    export const exchangeCodeForToken = async () => {
        const basicAuth = btoa(`${clientID}:${clientSecret}`); // base64 encoding of clientId:clientSecret

        const body = new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirectURI,
        });
      
        try {
          const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
              'Authorization': `Basic ${basicAuth}`, // Base64-encoded client_id:client_secret
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString(),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('spotify_access_token', data.access_token);
            return data;
          } else {
            console.error('Failed to exchange authorization code for access token');
          }
        } catch (error) {
          console.error('Error exchanging code for token:', error);
        }
      };




export const getAccessToken = () => {
  return localStorage.getItem('spotify_access_token');
};

export const searchSpotify = async (input, token) => {
  try {
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(input)}&type=track&limit=20`;

    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.tracks.items;
    } else {
      console.error('Failed to fetch search results from Spotify');
      return [];
    }
  } catch (error) {
    console.error('Error during Spotify search request:', error);
    return [];
  }
};
 