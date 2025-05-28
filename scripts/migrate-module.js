const fs = require('fs').promises;
const path = require('path');

// Função para criar diretório se não existir
async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

// Função para mover arquivo com backup
async function moveFile(from, to) {
  try {
    // Criar backup
    const backupPath = `${to}.backup`;
    await fs.copyFile(from, backupPath);
    
    // Mover arquivo
    await fs.rename(from, to);
    console.log(`✅ Arquivo movido: ${from} → ${to}`);
    
    // Remover backup após sucesso
    await fs.unlink(backupPath);
  } catch (error) {
    console.error(`❌ Erro ao mover arquivo ${from}:`, error);
    throw error;
  }
}

// Função principal para migrar um módulo
async function migrateModule(moduleName) {
  try {
    console.log(`\nIniciando migração do módulo: ${moduleName}`);
    
    // Caminhos base
    const baseDir = path.join('app', '(protected)', 'admin', moduleName);
    
    // Criar estrutura de pastas
    const dirs = ['components', 'mobile', 'desktop', 'api', 'types'];
    for (const dir of dirs) {
      await ensureDir(path.join(baseDir, dir));
    }
    
    // Mover componentes compartilhados
    const components = ['FormBanho', 'FormBanhos'];
    for (const component of components) {
      const from = path.join(baseDir, `${component}.tsx`);
      const to = path.join(baseDir, 'components', `${component}.tsx`);
      await moveFile(from, to);
    }
    
    // Mover páginas
    await moveFile(
      path.join(baseDir, 'page.desktop.tsx'),
      path.join(baseDir, 'desktop', 'page.tsx')
    );
    
    await moveFile(
      path.join(baseDir, 'page.tsx'),
      path.join(baseDir, 'mobile', 'page.tsx')
    );
    
    console.log(`\nMigração do módulo ${moduleName} concluída com sucesso!`);
  } catch (error) {
    console.error(`\nErro na migração do módulo ${moduleName}:`, error);
    throw error;
  }
}

// Função para executar a migração
async function executeMigration() {
  try {
    // Começando com o módulo banhos
    await migrateModule('banhos');
    
    console.log('\n✅ Migração inicial concluída!');
    console.log('Próximos passos:');
    console.log('1. Verificar se tudo está funcionando corretamente');
    console.log('2. Atualizar imports nos arquivos');
    console.log('3. Continuar com o próximo módulo');
  } catch (error) {
    console.error('\n❌ Erro na execução da migração:', error);
  }
}

// Executar a migração
executeMigration();
