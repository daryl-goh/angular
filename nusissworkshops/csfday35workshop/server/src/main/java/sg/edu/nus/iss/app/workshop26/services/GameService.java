package sg.edu.nus.iss.app.workshop26.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sg.edu.nus.iss.app.workshop26.models.Game;
import sg.edu.nus.iss.app.workshop26.repositories.GameRepository;


@Service
public class GameService {

  @Autowired
  GameRepository gameRepo;

  public List<Game> findGames(Integer limit, Integer offset, boolean isRanked) {
    return gameRepo.findGames(limit, offset, isRanked);
  }

  public Optional<Game> findGameDetailsById(Integer gameId) {
    return gameRepo.findGameById(gameId);
  }
}