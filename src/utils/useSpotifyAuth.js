
const clientID = "831ce5e002bb40d580592f7f2281d266";
const clientSecret = "dadaf4a005444351a0ba07c0c8baff33";
const responseType = "code";
const  redirectURI = "https://griimsoul.github.io/jamming/callback";
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
            localStorage.setItem('spotify_refresh_token', data.refresh_token);
            return data.access_token;
          } else {
            console.error('Failed to exchange authorization code for access token');
          }
        } catch (error) {
          console.error('Error exchanging code for token:', error);
          refreshAccessToken();
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

// Helper function to set a timeout for fetch requests
async function fetchWithTimeout(url, options, timeout = 5000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    ),
  ]);
}

export async function savePlaylist(isPrivate, playName, playTracks, token) {
  if (!playTracks || playTracks.length === 0) {
    console.error("No tracks in the playlist.");
    return;
  }

  try {
    console.log("Step 1: Fetching user ID...");
    const userResponse = await fetchWithTimeout('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!userResponse.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData = await userResponse.json();
    const userId = userData.id;
    if (!userId) {
      throw new Error("Failed to retrieve user ID");
    }

    console.log("User ID retrieved:", userId);

    console.log("Step 2: Creating playlist...");
    const createPlaylistResponse = await fetchWithTimeout(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: playName,
        public: !isPrivate,  // If isPrivate is true, set public to false
      })
    });

    if (!createPlaylistResponse.ok) {
      throw new Error("Failed to create playlist");
    }

    const playlistData = await createPlaylistResponse.json();
    const playlistId = playlistData.id;
    if (!playlistId) {
      throw new Error("Playlist creation failed, no playlist ID returned.");
    }

    console.log("Playlist created with ID:", playlistId);

    console.log("Step 3: Adding tracks to the playlist in batches...");
    const trackUris = playTracks.map(track => track.uri);
    const maxBatchSize = 100; // Spotify's max track limit per request

    // Loop through batches of URIs and add them
    for (let i = 0; i < trackUris.length; i += maxBatchSize) {
      const urisChunk = trackUris.slice(i, i + maxBatchSize);

      const addTracksResponse = await fetchWithTimeout(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uris: urisChunk
        })
      });

      if (!addTracksResponse.ok) {
        throw new Error("Failed to add tracks to playlist");
      }

      console.log(`Added ${urisChunk.length} tracks to playlist.`);
    }

    console.log(`Playlist "${playName}" created successfully with ${trackUris.length} tracks.`);

  } catch (error) {
    console.error("Error during playlist creation process:", error);
  }
}


export const refreshAccessToken = async () => {
  const basicAuth = btoa(`${clientID}:${clientSecret}`); // Base64 encoding of clientId:clientSecret

  const actualToken = localStorage.getItem('spotify_refresh_token');

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: actualToken, // Use the stored refresh token
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
      const newAccessToken = data.access_token;
      localStorage.setItem('spotify_access_token', newAccessToken); // Store the new access token
      return newAccessToken; // Return the new access token
    } else {
      console.error('Failed to refresh access token');
    }
  } catch (error) {
    console.error('Error refreshing access token:', error);
  }
};


export const handleSavePlaylist = async (isPrivate, playName, playTracks) => {
  try {
    // Refresh the access token before saving the playlist
    const newAccessToken = await refreshAccessToken();
    
    // Now call savePlaylist with the new access token
    await savePlaylist(isPrivate, playName, playTracks, newAccessToken);
  } catch (error) {
    console.error("Error while saving the playlist:", error);
  }
};

export const isAccessTokenValid = async () => {
  const token = getAccessToken();
  if (!token) return false;

  // Make a simple request to verify the token
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.ok; // Returns true if the token is valid
};