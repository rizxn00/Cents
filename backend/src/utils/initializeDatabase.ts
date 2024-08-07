import { supabase } from '../config/supabase';

export async function initializeDatabase() {
  const createTriggerFunction = `
    CREATE OR REPLACE FUNCTION trigger_set_timestamp()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `;

  const createTables = `
    CREATE TABLE IF NOT EXISTS profiles (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      email TEXT UNIQUE NOT NULL,
      username TEXT UNIQUE NOT NULL,
      name TEXT,
      currency TEXT,
      onboarding BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS expenses (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES profiles(id),
      amount NUMERIC NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      date DATE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS incomes (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES profiles(id),
      amount NUMERIC NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      date DATE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createTriggers = `
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_timestamp' AND tgrelid = 'profiles'::regclass) THEN
        CREATE TRIGGER set_timestamp
        BEFORE UPDATE ON profiles
        FOR EACH ROW
        EXECUTE FUNCTION trigger_set_timestamp();
      END IF;

      IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_timestamp' AND tgrelid = 'expenses'::regclass) THEN
        CREATE TRIGGER set_timestamp
        BEFORE UPDATE ON expenses
        FOR EACH ROW
        EXECUTE FUNCTION trigger_set_timestamp();
      END IF;

      IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_timestamp' AND tgrelid = 'incomes'::regclass) THEN
        CREATE TRIGGER set_timestamp
        BEFORE UPDATE ON incomes
        FOR EACH ROW
        EXECUTE FUNCTION trigger_set_timestamp();
      END IF;
    END $$;
  `;

  try {
    const { error: triggerFunctionError } = await supabase.rpc('execute_sql', { sql: createTriggerFunction });
    if (triggerFunctionError) throw triggerFunctionError;

    const { error: tablesError } = await supabase.rpc('execute_sql', { sql: createTables });
    if (tablesError) throw tablesError;

    const { error: triggersError } = await supabase.rpc('execute_sql', { sql: createTriggers });
    if (triggersError) throw triggersError;

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}