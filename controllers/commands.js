const { exec } = require('child_process');

const executeCommand = async (req, res) => {
    const command = req.body.command;

    if (!command) {
        return res.status(400).json({ error: 'Command is required' });
    }


    try {
        // Execute the command
        exec(command, (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({ error: `Command execution failed: ${stderr}` });
            }
            res.json({ output: stdout });
        });
    } catch (error) {
        // Check if the error is due to Aikido's SSRF protection
        if (error.message && error.message.includes('Aikido firewall has blocked')) {
            console.error('Blocked by Aikido Security:', error.message);
            return res.status(403).json({ error: "Blocked by Security." });
        }

        // Log and return a 500 error for all other errors
        console.error('Error fetching:', error.message);
        return res.status(500).json({ error: "Error ." });
    }
};

module.exports = { executeCommand }

