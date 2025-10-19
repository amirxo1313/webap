import { useQuery } from "@tanstack/react-query";
import { SearchResponse } from "@shared/schema";
import { Layout } from "@/components/Layout";
import { MediaCard } from "@/components/MediaCard";
import { TrackList } from "@/components/TrackList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search as SearchIcon, Loader2, Music } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function Search() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split('?')[1] || '');
  const query = params.get('q') || '';

  const { data, isLoading } = useQuery<SearchResponse>({
    queryKey: ['/api/radiojavan/search', query],
    enabled: query.length > 0,
  });

  const results = data?.result;
  const totalResults =
    (results?.songs?.length || 0) +
    (results?.albums?.length || 0) +
    (results?.artists?.length || 0) +
    (results?.playlists?.length || 0) +
    (results?.videos?.length || 0) +
    (results?.podcasts?.length || 0);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {!query ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <SearchIcon className="w-24 h-24 text-muted-foreground mx-auto mb-6 opacity-50" />
              <h2 className="text-2xl font-semibold mb-2">Search for music</h2>
              <p className="text-muted-foreground">
                Use the search bar above to find songs, albums, artists, and more
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                Search Results
              </h1>
              <p className="text-muted-foreground">
                {isLoading ? (
                  'Searching...'
                ) : totalResults > 0 ? (
                  <>Found {totalResults} results for <span className="text-foreground font-medium">"{query}"</span></>
                ) : (
                  <>No results found for <span className="text-foreground font-medium">"{query}"</span></>
                )}
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center min-h-[40vh]">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground" data-testid="text-searching">Searching...</p>
                </div>
              </div>
            ) : totalResults > 0 ? (
              <Tabs defaultValue="all" className="space-y-6">
                <TabsList className="bg-card">
                  <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
                  {results?.songs && results.songs.length > 0 && (
                    <TabsTrigger value="songs" data-testid="tab-songs">
                      Songs ({results.songs.length})
                    </TabsTrigger>
                  )}
                  {results?.albums && results.albums.length > 0 && (
                    <TabsTrigger value="albums" data-testid="tab-albums">
                      Albums ({results.albums.length})
                    </TabsTrigger>
                  )}
                  {results?.artists && results.artists.length > 0 && (
                    <TabsTrigger value="artists" data-testid="tab-artists">
                      Artists ({results.artists.length})
                    </TabsTrigger>
                  )}
                  {results?.playlists && results.playlists.length > 0 && (
                    <TabsTrigger value="playlists" data-testid="tab-playlists">
                      Playlists ({results.playlists.length})
                    </TabsTrigger>
                  )}
                  {results?.videos && results.videos.length > 0 && (
                    <TabsTrigger value="videos" data-testid="tab-videos">
                      Videos ({results.videos.length})
                    </TabsTrigger>
                  )}
                  {results?.podcasts && results.podcasts.length > 0 && (
                    <TabsTrigger value="podcasts" data-testid="tab-podcasts">
                      Podcasts ({results.podcasts.length})
                    </TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="all" className="space-y-8">
                  {results?.songs && results.songs.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-display font-bold mb-4">Songs</h2>
                      <Card className="p-4">
                        <TrackList tracks={results.songs} />
                      </Card>
                    </div>
                  )}
                  
                  {results?.albums && results.albums.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-display font-bold mb-4">Albums</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {results.albums.map((item) => (
                          <MediaCard key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  )}

                  {results?.artists && results.artists.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-display font-bold mb-4">Artists</h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {results.artists.map((item) => (
                          <MediaCard key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  )}

                  {results?.playlists && results.playlists.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-display font-bold mb-4">Playlists</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {results.playlists.map((item) => (
                          <MediaCard key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  )}

                  {results?.videos && results.videos.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-display font-bold mb-4">Videos</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {results.videos.map((item) => (
                          <MediaCard key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  )}

                  {results?.podcasts && results.podcasts.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-display font-bold mb-4">Podcasts</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {results.podcasts.map((item) => (
                          <MediaCard key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                {results?.songs && results.songs.length > 0 && (
                  <TabsContent value="songs">
                    <Card className="p-4">
                      <TrackList tracks={results.songs} />
                    </Card>
                  </TabsContent>
                )}

                {results?.albums && results.albums.length > 0 && (
                  <TabsContent value="albums">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                      {results.albums.map((item) => (
                        <MediaCard key={item.id} item={item} />
                      ))}
                    </div>
                  </TabsContent>
                )}

                {results?.artists && results.artists.length > 0 && (
                  <TabsContent value="artists">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {results.artists.map((item) => (
                        <MediaCard key={item.id} item={item} />
                      ))}
                    </div>
                  </TabsContent>
                )}

                {results?.playlists && results.playlists.length > 0 && (
                  <TabsContent value="playlists">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                      {results.playlists.map((item) => (
                        <MediaCard key={item.id} item={item} />
                      ))}
                    </div>
                  </TabsContent>
                )}

                {results?.videos && results.videos.length > 0 && (
                  <TabsContent value="videos">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {results.videos.map((item) => (
                        <MediaCard key={item.id} item={item} />
                      ))}
                    </div>
                  </TabsContent>
                )}

                {results?.podcasts && results.podcasts.length > 0 && (
                  <TabsContent value="podcasts">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {results.podcasts.map((item) => (
                        <MediaCard key={item.id} item={item} />
                      ))}
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            ) : (
              <div className="flex items-center justify-center min-h-[40vh]">
                <div className="text-center">
                  <Music className="w-24 h-24 text-muted-foreground mx-auto mb-6 opacity-50" />
                  <p className="text-xl text-muted-foreground" data-testid="text-no-results">
                    No results found for "{query}"
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try searching with different keywords
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
