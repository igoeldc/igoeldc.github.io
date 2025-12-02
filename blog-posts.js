// Blog posts data
const blogPosts = {
    '1': {
        title: "Understanding Stochastic Gradient Descent in Deep Learning",
        date: "November 15, 2024",
        category: "Machine Learning",
        tags: ["Deep Learning", "Optimization", "PyTorch"],
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        content: `
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

            <h2>Introduction to Gradient Descent</h2>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

            <h2>The Stochastic Approach</h2>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>

            <blockquote>
                "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident."
            </blockquote>

            <h3>Key Advantages</h3>
            <ul>
                <li>Faster convergence for large datasets</li>
                <li>Better escape from local minima</li>
                <li>Memory efficient implementation</li>
                <li>Works well with online learning</li>
            </ul>

            <h2>Implementation in PyTorch</h2>
            <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.</p>

            <pre><code>import torch
import torch.nn as nn
import torch.optim as optim

# Define model
model = nn.Sequential(
    nn.Linear(784, 128),
    nn.ReLU(),
    nn.Linear(128, 10)
)

# Define optimizer
optimizer = optim.SGD(model.parameters(), lr=0.01, momentum=0.9)

# Training loop
for epoch in range(num_epochs):
    for batch in dataloader:
        optimizer.zero_grad()
        output = model(batch.x)
        loss = criterion(output, batch.y)
        loss.backward()
        optimizer.step()</code></pre>

            <h2>Variants and Extensions</h2>
            <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>

            <h3>Popular Variants</h3>
            <ol>
                <li><strong>SGD with Momentum:</strong> Accumulates a velocity vector to accelerate convergence</li>
                <li><strong>Adam:</strong> Adaptive learning rates for each parameter</li>
                <li><strong>RMSprop:</strong> Uses moving average of squared gradients</li>
                <li><strong>AdaGrad:</strong> Adapts learning rate based on parameter history</li>
            </ol>

            <h2>Conclusion</h2>
            <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.</p>
        `
    },
    '2': {
        title: "Brownian Motion and Its Applications in Finance",
        date: "October 28, 2024",
        category: "Mathematics",
        tags: ["Stochastic Processes", "Finance", "Probability"],
        excerpt: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        content: `
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            <h2>Foundations of Brownian Motion</h2>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>

            <h2>Applications in Financial Modeling</h2>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>

            <h3>The Black-Scholes Model</h3>
            <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>

            <blockquote>
                "In financial markets, the random walk hypothesis suggests that stock price changes have the same distribution and are independent of each other."
            </blockquote>

            <h2>Conclusion</h2>
            <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>
        `
    },
    '3': {
        title: "Transformers and Attention Mechanisms Explained",
        date: "September 12, 2024",
        category: "Natural Language Processing",
        tags: ["NLP", "Transformers", "Attention"],
        excerpt: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        content: `
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

            <h2>The Attention Mechanism</h2>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</p>

            <h3>Self-Attention</h3>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>

            <ul>
                <li>Query, Key, and Value vectors</li>
                <li>Scaled dot-product attention</li>
                <li>Multi-head attention</li>
                <li>Positional encoding</li>
            </ul>

            <h2>Transformer Architecture</h2>
            <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.</p>

            <blockquote>
                "Attention is all you need" - the revolutionary paper that introduced the Transformer architecture.
            </blockquote>

            <h2>Modern Applications</h2>
            <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>
        `
    },
    '4': {
        title: "Exploring Network Centrality Measures",
        date: "August 5, 2024",
        category: "Graph Theory",
        tags: ["Graph Theory", "NetworkX", "Data Science"],
        excerpt: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
        content: `
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.</p>

            <h2>Introduction to Centrality</h2>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>

            <h2>Types of Centrality Measures</h2>
            <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>

            <h3>Common Measures</h3>
            <ol>
                <li><strong>Degree Centrality:</strong> Number of connections a node has</li>
                <li><strong>Betweenness Centrality:</strong> How often a node appears on shortest paths</li>
                <li><strong>Closeness Centrality:</strong> Average distance to all other nodes</li>
                <li><strong>Eigenvector Centrality:</strong> Importance based on connections to important nodes</li>
            </ol>

            <blockquote>
                "In network analysis, not all nodes are created equal. Centrality measures help us identify the most important nodes."
            </blockquote>

            <h2>Applications</h2>
            <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>

            <ul>
                <li>Social network analysis</li>
                <li>Transportation networks</li>
                <li>Biological networks</li>
                <li>Communication networks</li>
            </ul>
        `
    },
    '5': {
        title: "Monte Carlo Methods in Reinforcement Learning",
        date: "July 20, 2024",
        category: "Reinforcement Learning",
        tags: ["RL", "Monte Carlo", "Policy Iteration"],
        excerpt: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa.",
        content: `
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa.</p>

            <h2>Introduction to Monte Carlo Methods</h2>
            <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.</p>

            <h2>Monte Carlo Prediction</h2>
            <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>

            <h3>First-Visit vs Every-Visit</h3>
            <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.</p>

            <blockquote>
                "Monte Carlo methods learn from complete episodes of experience, making them particularly suitable for episodic tasks."
            </blockquote>

            <h2>Monte Carlo Control</h2>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

            <ul>
                <li>Exploring starts</li>
                <li>Epsilon-greedy policies</li>
                <li>On-policy vs off-policy methods</li>
                <li>Importance sampling</li>
            </ul>
        `
    },
    '6': {
        title: "Building a Python Library: Lessons from mathcode",
        date: "June 8, 2024",
        category: "Software Engineering",
        tags: ["Python", "PyPI", "Open Source"],
        excerpt: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus.",
        content: `
            <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus.</p>

            <h2>Getting Started with PyPI</h2>
            <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>

            <h2>Project Structure</h2>
            <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.</p>

            <h3>Essential Files</h3>
            <ul>
                <li>setup.py or pyproject.toml</li>
                <li>README.md with clear documentation</li>
                <li>LICENSE file</li>
                <li>Requirements and dependencies</li>
            </ul>

            <blockquote>
                "Good documentation is just as important as good code. Your users will thank you."
            </blockquote>

            <h2>Publishing and Maintenance</h2>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

            <h3>Best Practices</h3>
            <ol>
                <li><strong>Versioning:</strong> Follow semantic versioning (SemVer)</li>
                <li><strong>Testing:</strong> Write comprehensive tests before publishing</li>
                <li><strong>CI/CD:</strong> Automate testing and deployment</li>
                <li><strong>Documentation:</strong> Keep it up to date with code changes</li>
            </ol>

            <h2>Lessons Learned</h2>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
        `
    }
};