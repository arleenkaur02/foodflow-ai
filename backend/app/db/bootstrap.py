from pathlib import Path

import psycopg

from app.core.config import settings


ROOT = Path(__file__).resolve().parents[3]
SCHEMA_PATH = ROOT / "db" / "schema.sql"
SEED_PATH = ROOT / "db" / "seed.sql"


def psycopg_url() -> str:
    return settings.database_url.replace("postgresql+psycopg://", "postgresql://", 1)


def main() -> None:
    with psycopg.connect(psycopg_url()) as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT EXISTS (
                    SELECT FROM information_schema.tables
                    WHERE table_schema = 'public' AND table_name = 'users'
                )
                """
            )
            schema_exists = cur.fetchone()[0]
            if not schema_exists:
                cur.execute(SCHEMA_PATH.read_text())

            cur.execute("SELECT COUNT(*) FROM users")
            user_count = cur.fetchone()[0]
            if user_count == 0:
                cur.execute(SEED_PATH.read_text())
        conn.commit()


if __name__ == "__main__":
    main()
