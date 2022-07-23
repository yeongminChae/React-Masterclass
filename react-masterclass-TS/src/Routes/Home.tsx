import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import {
  IGetMoviesResult,
  IMovieLatest,
  getNowPlayingMovies,
  getLatestMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../Api";
import { makeImgPath } from "../utils";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 20px;
  width: 50%;
`;

const SliderWrapper = styled.div`
  margin: -100px 0 -20px 0;
  max-width: 1440px;
  position: relative;
  @media screen and (max-width: 1440px) {
    padding-bottom: 60px;
  }

  @media screen and (max-width: 480px) {
    padding-bottom: 40px;
  }
`;

const Slider = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    margin: -15px 14.7px;
    font-weight: bold;
    @media screen and (max-width: 1440px) {
      margin-bottom: 0;
    }
  }
  & + div {
    margin-top: 100px;
    @media screen and (max-width: 1440px) {
      margin-top: 80px;
    }
    @media screen and (max-width: 480px) {
      margin-top: 60px;
    }
  }
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 150px;
  font-size: 66px;
  &:first-child {
    transform-origin: center left;
    margin-left: 10px;
  }
  &:last-child {
    transform-origin: center right;
    margin-right: 10px;
  }
  cursor: pointer;
  margin: 10px 10px 0 0;
`;

const Info = styled(motion.div)`
  padding: 20px;
  opacity: 0;
  background-color: ${(props) => props.theme.black.lighter};
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 300px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  position: relative;
  font-size: 30px;
  top: -80px;
`;

const BigOverView = styled.div`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  position: relative;
  top: -80px;
`;

const rowVariants = {
  hidden: { x: window.outerWidth + 5 },
  visible: { x: 0 },
  exit: { x: -window.outerWidth - 5 },
};

const offset = 6;

const infoVariants = {
  hover: {
    opacity: 0.8,
    transition: {
      delay: 0.2,
      duration: 0.3,
      type: "tween",
    },
  },
};

const BoxVariants = {
  narmal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.2,
      duration: 0.3,
      type: "tween",
    },
  },
};

function Home() {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { scrollY } = useViewportScroll();
  const { data: dataNowPlaying, isLoading: isLoadingNowPlaying } =
    useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getNowPlayingMovies);
  const { data: dataLatest, isLoading: isLoadingLatest } =
    useQuery<IMovieLatest>(["movies", "Latest"], getLatestMovies);
  const { data: dataTopRated, isLoading: isLoadingTopRated } =
    useQuery<IGetMoviesResult>(["movies", "TopRated"], getTopRatedMovies);
  const { data: dataUpcoming, isLoading: isLoadingUpcoming } =
    useQuery<IGetMoviesResult>(["movies", "Upcoming"], getUpcomingMovies);
  const isLoading =
    isLoadingNowPlaying &&
    isLoadingLatest &&
    isLoadingTopRated &&
    isLoadingUpcoming;
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const incraseIndex = () => {
    if (dataNowPlaying) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = dataNowPlaying.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };
  const onOnverlayClick = () => history.push("/");
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    dataNowPlaying?.results.find(
      (movie) => String(movie.id) == bigMovieMatch.params.movieId
    );
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={incraseIndex}
            bgPhoto={makeImgPath(
              dataNowPlaying?.results[6].backdrop_path || ""
            )}
          >
            <Title>{dataNowPlaying?.results[6].title}</Title>
            <Overview>{dataNowPlaying?.results[6].overview}</Overview>
          </Banner>
          <SliderWrapper>
            <div>
              <Slider style={{ marginBottom: "100px" }}>
                <h2>Now Playing Movies</h2>
                <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                  <Row
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: "tween", duration: 1 }}
                    key={index}
                  >
                    {dataNowPlaying?.results
                      .slice(1)
                      .slice(offset * index, offset * index + offset)
                      .map((movie) => (
                        <Box
                          layoutId={movie.id + ""}
                          key={movie.id}
                          whileHover="hover"
                          initial="normal"
                          onClick={() => onBoxClicked(movie.id)}
                          variants={BoxVariants}
                          transition={{ type: "tween" }}
                          bgPhoto={makeImgPath(movie.backdrop_path, "w500")}
                        >
                          {/* <img />  move bgphoto to here */}
                          <Info variants={infoVariants}>
                            <h4>{movie.title} </h4>
                          </Info>
                        </Box>
                      ))}
                  </Row>
                </AnimatePresence>
              </Slider>
            </div>
            <br />
            <div>
              <Slider style={{ marginTop: "100px", marginBottom: "100px" }}>
                <h2>Top Rated Movies</h2>
                <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                  <Row
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: "tween", duration: 1 }}
                    key={index}
                  >
                    {dataTopRated?.results
                      .slice(1)
                      .slice(offset * index, offset * index + offset)
                      .map((movie) => (
                        <Box
                          layoutId={movie.id + ""}
                          key={movie.id}
                          whileHover="hover"
                          initial="normal"
                          onClick={() => onBoxClicked(movie.id)}
                          variants={BoxVariants}
                          transition={{ type: "tween" }}
                          bgPhoto={makeImgPath(movie.backdrop_path, "w500")}
                        >
                          {/* <img />  move bgphoto to here */}
                          <Info variants={infoVariants}>
                            <h4>{movie.title} </h4>
                          </Info>
                        </Box>
                      ))}
                  </Row>
                </AnimatePresence>
              </Slider>
            </div>
            <br />
            <div>
              <Slider style={{ marginTop: "100px", marginBottom: "100px" }}>
                <h2>Upcoming Movies</h2>
                <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                  <Row
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: "tween", duration: 1 }}
                    key={index}
                  >
                    {dataUpcoming?.results
                      .slice(1)
                      .slice(offset * index, offset * index + offset)
                      .map((movie) => (
                        <Box
                          layoutId={movie.id + ""}
                          key={movie.id}
                          whileHover="hover"
                          initial="normal"
                          onClick={() => onBoxClicked(movie.id)}
                          variants={BoxVariants}
                          transition={{ type: "tween" }}
                          bgPhoto={makeImgPath(movie.backdrop_path, "w500")}
                        >
                          {/* <img />  move bgphoto to here */}
                          <Info variants={infoVariants}>
                            <h4>{movie.title} </h4>
                          </Info>
                        </Box>
                      ))}
                  </Row>
                </AnimatePresence>
              </Slider>
            </div>
          </SliderWrapper>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOnverlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                ></Overlay>
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black,transparent) , url(${makeImgPath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      ></BigCover>
                      <BigTitle>{clickedMovie.title} </BigTitle>
                      <BigOverView>{clickedMovie.overview} </BigOverView>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
