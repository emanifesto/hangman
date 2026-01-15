interface Stats{
    games_won: number;
    games_lost: number;
    games_total: number; //games_lost + games_won
    predictions: number;
    score: number;
    // time_played: number;
    speed: number; //time_played / games_total
    // lives_left: number;
    accuracy: number; //lives_left / games_total
    flawless_games: number;
}

export interface Profile{
    name: string;
    date_joined: Date;
    daily: Stats;
    weekly: Stats;
    all_time: Stats;
}

export default class UserProfile{
    name: string;
    date_joined: Date;
    daily: Stats;
    weekly: Stats;
    all_time: Stats;

    constructor(name: string, date_joined: Date, daily_games_won: number, 
        daily_games_lost: number, daily_predictions: number, daily_score: number,
        daily_time_played: number, daily_lives_left: number, daily_flawless_games: number,
        weekly_games_won: number, weekly_games_lost: number, weekly_predictions: number,
        weekly_score: number, weekly_time_played: number, weekly_lives_left: number,
        weekly_flawless_games: number, all_time_games_won: number, all_time_games_lost: number,
        all_time_predictions: number, all_time_score: number, all_time_time_played: number,
        all_time_lives_left: number, all_time_flawless_games: number,
    ){
        this.name = name
        this.date_joined = date_joined

        const games_total: number[] = [(daily_games_won + daily_games_lost),
            (weekly_games_won + weekly_games_lost), (all_time_games_won + all_time_games_lost)]

        const speed: number[] = [(daily_time_played / games_total[0]),
            (weekly_time_played / games_total[1]), (all_time_time_played / games_total[2])]

        const accuracy: number[] = [(daily_lives_left / games_total[0]),
            (weekly_lives_left / games_total[1]), (all_time_lives_left / games_total[2])]

        this.daily = {games_won: daily_games_won,
            games_lost: daily_games_lost, games_total: games_total[0],
            predictions: daily_predictions, score: daily_score, speed: speed[0],
            accuracy: accuracy[0], flawless_games: daily_flawless_games,
        }

        this.weekly = {games_won: weekly_games_won,
            games_lost: weekly_games_lost, games_total: games_total[1],
            predictions: weekly_predictions, score: weekly_score, speed: speed[1],
            accuracy: accuracy[1], flawless_games: weekly_flawless_games,
        }

        this.all_time = {games_won: all_time_games_won,
            games_lost: all_time_games_lost, games_total: games_total[2],
            predictions: all_time_predictions, score: all_time_score, speed: speed[2],
            accuracy: accuracy[2], flawless_games: all_time_flawless_games,
        }
    }
}